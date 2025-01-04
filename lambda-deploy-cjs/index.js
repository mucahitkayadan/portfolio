const { OpenAI } = require("openai");
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');

const dynamodb = new DynamoDBClient();

const allowedOrigins = [
    'https://mujakayadan.com', 
    'https://blog.mujakayadan.com',
    'http://localhost:5173'
];

exports.handler = async (event) => {    
    const origin = event.headers?.origin || event.headers?.Origin || allowedOrigins[0];
    
    const headers = {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // Handle direct invocation and API Gateway events
        let message, threadId;
        if (event.body) {
            const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
            message = body.message;
            threadId = body.threadId;
        } else {
            message = event.message;
            threadId = event.threadId;
        }

        if (!message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: "Message is required" })
            };
        }

        let thread;
        if (threadId) {
            thread = { id: threadId };
        } else {
            thread = await openai.beta.threads.create();
        }

        await openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: message
            }
        );

        const run = await openai.beta.threads.runs.create(
            thread.id,
            {
                assistant_id: process.env.OPENAI_ASSISTANT_ID,
            }
        );

        let runStatus = await openai.beta.threads.runs.retrieve(
            thread.id,
            run.id
        );

        while (runStatus.status !== "completed") {
            if (runStatus.status === "failed") {
                throw new Error("Assistant run failed");
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            runStatus = await openai.beta.threads.runs.retrieve(
                thread.id,
                run.id
            );
        }

        const messages = await openai.beta.threads.messages.list(
            thread.id
        );

        const assistantResponse = messages.data
            .filter(msg => msg.role === "assistant")
            .map(msg => {
                let text = msg.content[0].text.value;
                text = text.replace(/【\d+:\d+†[^】]+】/g, '');
                return text;
            })[0];

        // Save to DynamoDB
        const chatId = uuidv4();
        const dynamoParams = {
            TableName: "portfolio-chats",
            Item: {
                id: { S: chatId },
                threadId: { S: thread.id },
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
                threadId: thread.id
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
