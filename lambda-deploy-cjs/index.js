const { OpenAI } = require("openai");
const { DynamoDBClient, PutItemCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');

const dynamodb = new DynamoDBClient();

const allowedOrigins = [
    'https://mujakayadan.com', 
    'https://blog.mujakayadan.com',
    'http://localhost:5173'
];

async function getRecentMessages(threadId) {
    if (!threadId) return [];

    const params = {
        TableName: "portfolio-chats",
        KeyConditionExpression: "threadId = :threadId",
        ExpressionAttributeValues: {
            ":threadId": { S: threadId }
        },
        ScanIndexForward: true // Get messages in chronological order
    };

    try {
        const result = await dynamodb.send(new QueryCommand(params));
        return result.Items.map(item => ({
            userMessage: item.userMessage.S,
            assistantResponse: item.assistantResponse.S
        }));
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
}

exports.handler = async (event) => {    
    const origin = event.headers?.origin || event.headers?.Origin || allowedOrigins[0];
    
    const headers = {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };

    // Log the incoming event
    console.log('Received event:', JSON.stringify(event, null, 2));

    // Handle OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'OK' })
        };
    }

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // Parse the body correctly for API Gateway
        let body;
        try {
            body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        } catch (error) {
            console.error("Error parsing body:", error);
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: "Invalid request body" })
            };
        }

        const { message, threadId } = body;
        console.log("Received message:", message);
        console.log("Thread ID:", threadId);

        let currentThreadId = threadId;
        let thread;

        if (currentThreadId) {
            // Use existing thread
            thread = { id: currentThreadId };
        } else {
            // Create new thread
            thread = await openai.beta.threads.create();
            currentThreadId = thread.id;
        }

        console.log("Using thread:", currentThreadId);

        // Get previous messages if thread exists
        const previousMessages = await getRecentMessages(currentThreadId);
        
        // Create new message
        await openai.beta.threads.messages.create(
            currentThreadId,
            {
                role: "user",
                content: message
            }
        );

        const run = await openai.beta.threads.runs.create(
            currentThreadId,
            {
                assistant_id: process.env.OPENAI_ASSISTANT_ID,
            }
        );

        let runStatus = await openai.beta.threads.runs.retrieve(
            currentThreadId,
            run.id
        );

        while (runStatus.status !== "completed") {
            if (runStatus.status === "failed") {
                throw new Error("Assistant run failed");
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            runStatus = await openai.beta.threads.runs.retrieve(
                currentThreadId,
                run.id
            );
        }

        const messages = await openai.beta.threads.messages.list(
            currentThreadId
        );

        const assistantResponse = messages.data
            .filter(msg => msg.role === "assistant")
            .map(msg => {
                let text = msg.content[0].text.value;
                text = text.replace(/【\d+:\d+†[^】]+】/g, '');
                return text;
            })[0];

        const chatId = uuidv4();
        const dynamoParams = {
            TableName: "portfolio-chats",
            Item: {
                id: { S: chatId },
                threadId: { S: currentThreadId },
                userMessage: { S: message },
                assistantResponse: { S: assistantResponse },
                timestamp: { S: new Date().toISOString() },
                userAgent: { S: event.headers?.['user-agent'] || 'Not provided' },
                ipAddress: { S: event.requestContext?.http?.sourceIp || 'Not provided' }
            }
        };

        await dynamodb.send(new PutItemCommand(dynamoParams));
        console.log('Saved to DynamoDB:', chatId);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                response: assistantResponse,
                threadId: currentThreadId,
                history: previousMessages
            })
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                message: error.message || "An error occurred"
            })
        };
    }
};
