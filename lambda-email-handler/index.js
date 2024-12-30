const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');

const sns = new SNSClient();
const dynamodb = new DynamoDBClient();

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    // Get the origin from the request
    const origin = event.headers?.origin || '*';
    const allowedOrigins = ['https://mujakayadan.com', 'http://localhost:5173'];
    
    const headers = {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };
    
    if (event.requestContext.http.method === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'OK' })
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { name, email, message } = body;

        // Generate unique ID for the contact
        const contactId = uuidv4();
        
        // Save to DynamoDB
        const dynamoParams = {
            TableName: "portfolio-contacts",
            Item: {
                id: { S: contactId },
                name: { S: name },
                email: { S: email },
                message: { S: message },
                timestamp: { S: new Date().toISOString() },
                userAgent: { S: event.headers['user-agent'] || 'Unknown' },
                ipAddress: { S: event.requestContext.http.sourceIp || 'Unknown' }
            }
        };

        await dynamodb.send(new PutItemCommand(dynamoParams));
        console.log('Saved to DynamoDB:', contactId);

        if (!name || !email || !message) {
            console.log('Missing required fields');
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    message: 'Name, email, and message are required' 
                })
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Invalid email format');
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    message: 'Invalid email format' 
                })
            };
        }

        const emailContent = `
New Contact Form Submission
ID: ${contactId}

From: ${name}
Email: ${email}
Timestamp: ${new Date().toISOString()}

Message:
${message}

---
Sent from your portfolio website contact form
        `.trim();

        const params = {
            Message: emailContent,
            Subject: `Portfolio Contact: ${name}`,
            TopicArn: process.env.SNS_TOPIC_ARN
        };

        console.log('Publishing to SNS with params:', JSON.stringify(params, null, 2));
        
        const command = new PublishCommand(params);
        await sns.send(command);
        console.log('Successfully published to SNS');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                message: 'Message sent successfully!' 
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                message: 'Error sending message',
                error: error.message 
            })
        };
    }
}; 