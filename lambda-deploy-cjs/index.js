const { OpenAI } = require("openai");
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');

const dynamodb = new DynamoDBClient();

exports.handler = async (event) => {
  console.log("Event received:", JSON.stringify(event, null, 2));
  
  // Get the origin from the request
  const origin = event.headers?.origin || '*';
  const allowedOrigins = ['https://mujakayadan.com', 'http://localhost:5173'];
  
  const headers = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  // Handle both API Gateway and Lambda URL requests
  const httpMethod = event.requestContext?.http?.method || event.httpMethod;
  
  if (httpMethod === 'OPTIONS') {
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

    // Handle both API Gateway and Lambda URL request bodies
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { message } = body;
    console.log("Received message:", message);

    const chatId = uuidv4();

    const thread = await openai.beta.threads.create();
    console.log("Created new thread:", thread.id);

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
        response: assistantResponse
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
