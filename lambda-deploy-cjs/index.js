const { OpenAI } = require("openai");
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const dynamodb = new DynamoDBClient();

const allowedOrigins = [
    'https://mujakayadan.com', 
    'https://blog.mujakayadan.com',
    'http://localhost:5173'
];

// Calendly API configuration
const CALENDLY_URL = process.env.CALENDLY_URL || 'https://calendly.com/mujakayadan/';
const CALENDLY_CLIENT_ID = process.env.CALENDLY_CLIENT_ID;
const CALENDLY_CLIENT_SECRET = process.env.CALENDLY_CLIENT_SECRET;
const CALENDLY_WEBHOOK_KEY = process.env.CALENDLY_WEBHOOK_KEY;

// Cache for the Calendly access token
let calendlyAccessToken = null;
let tokenExpiryTime = 0;

// Function to get Calendly access token
async function getCalendlyAccessToken() {
    try {
        // Check if we have a valid token
        const now = Date.now();
        if (calendlyAccessToken && now < tokenExpiryTime) {
            return calendlyAccessToken;
        }

        // Get a new token
        const response = await axios.post('https://auth.calendly.com/oauth/token', 
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: CALENDLY_CLIENT_ID,
                client_secret: CALENDLY_CLIENT_SECRET
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        if (response.status !== 200) {
            throw new Error(`Failed to get Calendly token: ${response.status}`);
        }

        const data = response.data;
        calendlyAccessToken = data.access_token;
        // Set expiry time to 1 hour minus 5 minutes for safety
        tokenExpiryTime = now + ((data.expires_in - 300) * 1000);
        
        return calendlyAccessToken;
    } catch (error) {
        console.error('Error getting Calendly access token:', error);
        return null;
    }
}

// Function to get available slots from Calendly
async function get_available_slots(timezone = 'America/Chicago') {
    try {
        // Use the personal access token if available, otherwise use direct link
        const token = process.env.CALENDLY_PERSONAL_TOKEN;
        const calendlyUrl = process.env.CALENDLY_URL || 'https://calendly.com/mujakayadan/';
        
        if (!token) {
            console.log('No Calendly personal access token provided. Using direct link.');
            return {
                message: `You can schedule a meeting with me using this link: ${calendlyUrl}`,
                showCalendly: true
            };
        }
        
        console.log('Fetching user data from Calendly with timezone:', timezone);
        
        // Get the user's data
        const userResponse = await axios.get('https://api.calendly.com/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const userData = userResponse.data;
        const userURI = userData.resource.uri;
        
        // Get the user's event types (meeting types)
        const eventTypesResponse = await axios.get(`https://api.calendly.com/event_types?user=${userURI}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const eventTypesData = eventTypesResponse.data;
        
        // Use the first active event type
        const activeEventTypes = eventTypesData.collection.filter(et => et.active);
        if (activeEventTypes.length === 0) {
            return {
                message: `You can schedule a meeting with me using this link: ${calendlyUrl}`,
                showCalendly: true
            };
        }
        
        // Get scheduled events for the next 7 days
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 7);
        
        const startTime = today.toISOString();
        const endTime = endDate.toISOString();
        
        // Get scheduled events
        const eventsResponse = await axios.get(
            `https://api.calendly.com/scheduled_events?user=${userURI}&min_start_time=${startTime}&max_start_time=${endTime}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        const eventsData = eventsResponse.data;
        
        // Format the response with proper markdown
        let response = `I'd be happy to help you schedule a meeting!\n\n`;
        
        if (eventsData.collection && eventsData.collection.length > 0) {
            // Format and display the scheduled events
            const scheduledEvents = eventsData.collection.map(event => {
                const startDate = new Date(event.start_time);
                const options = { 
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    timeZone: timezone,
                    timeZoneName: 'short'
                };
                return startDate.toLocaleString('en-US', options);
            });
            
            if (scheduledEvents.length === 1) {
                response += `I already have a meeting scheduled for:\n\n**${scheduledEvents[0]}**\n\n`;
            } else {
                response += "I have the following appointments scheduled:\n\n";
                scheduledEvents.forEach((time, index) => {
                    response += `${index + 1}. **${time}**\n`;
                });
                response += "\n";
            }
            
            response += `Feel free to choose any other time that works best for you using this link: ${calendlyUrl}\n\n`;
            response += "Would you like to proceed with scheduling? If so, could you please provide your name and email so I can create a personalized scheduling link for you? 📅";
        } else {
            response += `I don't have any meetings scheduled for the next 7 days, so you can pick any time that works best for you! You can schedule using this link: ${calendlyUrl}\n\n`;
            response += "Would you like to proceed with scheduling? I can create a personalized booking link for you - just share your name and email address. 📅";
        }
        
        return {
            message: response,
            showCalendly: true
        };
    } catch (error) {
        console.error('Error getting available slots from Calendly:', error);
        // Return a fallback message with the Calendly URL
        return {
            message: `I'm having trouble fetching my availability right now. Please use this link to schedule a meeting: ${process.env.CALENDLY_URL || 'https://calendly.com/mujakayadan/'}\n\nLet me know if you need any help! 😊`,
            showCalendly: true
        };
    }
}

// Define the functions that the assistant can call
const availableFunctions = {
    get_calendly_link: async function() {
        return {
            calendly_link: CALENDLY_URL,
            message: "Here's my Calendly link where you can see my availability and book a time that works for you: " + CALENDLY_URL
        };
    },
    get_available_slots: get_available_slots,
    book_appointment: async function(name, email) {
        try {
            // Use the personal access token if available
            const token = process.env.CALENDLY_PERSONAL_TOKEN;
            if (!token) {
                throw new Error('Could not authenticate with Calendly');
            }

            // Create a personalized scheduling link with pre-filled information
            const schedulingUrl = `${CALENDLY_URL}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
            
            return {
                success: true,
                message: `Perfect, ${name}! I've prepared a personalized scheduling link for you. When you click the link below, your information will be pre-filled:\n\n${schedulingUrl}\n\nJust choose a time that works best for you, and you'll receive a confirmation email at ${email} once it's scheduled. Looking forward to our meeting! 📅`,
                booking_link: schedulingUrl
            };
        } catch (error) {
            console.error('Error preparing booking link:', error);
            return {
                success: false,
                error: "I couldn't prepare your personalized booking link at the moment. Please try using my Calendly link directly: " + CALENDLY_URL,
                calendly_link: CALENDLY_URL
            };
        }
    }
};

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

        // Define the tools the assistant can use
        const tools = [
            {
                type: "function",
                function: {
                    name: "get_calendly_link",
                    description: "Get a link to the user's Calendly page to book an appointment",
                    parameters: {
                        type: "object",
                        properties: {},
                        required: []
                    }
                }
            },
            {
                type: "function",
                function: {
                    name: "get_available_slots",
                    description: "Get available time slots for booking an appointment",
                    parameters: {
                        type: "object",
                        properties: {
                            timezone: {
                                type: "string",
                                description: "The user's timezone in IANA format (e.g., 'America/New_York')"
                            }
                        },
                        required: []
                    }
                }
            },
            {
                type: "function",
                function: {
                    name: "book_appointment",
                    description: "Create a personalized scheduling link with pre-filled information",
                    parameters: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                                description: "The name of the person booking the appointment"
                            },
                            email: {
                                type: "string",
                                description: "The email address of the person booking the appointment"
                            }
                        },
                        required: ["name", "email"]
                    }
                }
            }
        ];

        // Start a run with the assistant
        const run = await openai.beta.threads.runs.create(
            thread.id,
            {
                assistant_id: process.env.OPENAI_ASSISTANT_ID,
                tools: tools
            }
        );

        // Poll for the run to complete
        let runStatus = await openai.beta.threads.runs.retrieve(
            thread.id,
            run.id
        );

        // Process the run until it's completed
        while (runStatus.status !== "completed") {
            // Check if the run requires action (function calling)
            if (runStatus.status === "requires_action") {
                const toolCalls = runStatus.required_action.submit_tool_outputs.tool_calls;
                const toolOutputs = [];

                // Process each tool call
                for (const toolCall of toolCalls) {
                    const functionName = toolCall.function.name;
                    const functionArgs = JSON.parse(toolCall.function.arguments || "{}");
                    
                    console.log('Function called:', functionName);
                    console.log('Function arguments:', functionArgs);
                    
                    let functionResponse;
                    try {
                        if (functionName === "get_calendly_link") {
                            functionResponse = await availableFunctions.get_calendly_link();
                            console.log('get_calendly_link response:', functionResponse);
                        } else if (functionName === "get_available_slots") {
                            functionResponse = await availableFunctions.get_available_slots(functionArgs.timezone);
                            console.log('get_available_slots response:', functionResponse);
                        } else if (functionName === "book_appointment") {
                            functionResponse = await availableFunctions.book_appointment(
                                functionArgs.name,
                                functionArgs.email
                            );
                            console.log('book_appointment response:', functionResponse);
                        }
                    } catch (error) {
                        console.error(`Error calling function ${functionName}:`, error);
                        functionResponse = {
                            error: `Failed to execute ${functionName}: ${error.message}`,
                            fallback_link: CALENDLY_URL
                        };
                    }

                    toolOutputs.push({
                        tool_call_id: toolCall.id,
                        output: JSON.stringify(functionResponse)
                    });
                }

                // Submit the outputs back to the assistant
                if (toolOutputs.length > 0) {
                    await openai.beta.threads.runs.submitToolOutputs(
                        thread.id,
                        run.id,
                        { tool_outputs: toolOutputs }
                    );
                }
            } else if (runStatus.status === "failed") {
                throw new Error("Assistant run failed");
            }

            // Wait a moment before checking again
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Add a timeout check - if we've been waiting too long, provide a fallback response
            try {
                runStatus = await openai.beta.threads.runs.retrieve(
                    thread.id,
                    run.id
                );
            } catch (error) {
                console.error("Error retrieving run status:", error);
                // If we can't retrieve the status, break the loop and use a fallback
                break;
            }
        }

        // Get the latest messages
        let assistantResponse;
        try {
            const messages = await openai.beta.threads.messages.list(
                thread.id
            );

            console.log('All messages:', messages.data);

            // Extract the assistant's response
            assistantResponse = messages.data
                .filter(msg => msg.role === "assistant")
                .map(msg => {
                    console.log('Processing assistant message:', msg);
                    let text = msg.content[0].text.value;
                    // Remove citation markers
                    text = text.replace(/【\d+:\d+†[^】]+】/g, '');
                    // Fix markdown links that might be malformed
                    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)\)/g, '[$1]($2)');
                    // Ensure Calendly links are properly formatted
                    if (text.includes(CALENDLY_URL)) {
                        // Replace markdown links with direct links
                        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1: $2');
                        // Make sure the URL is not part of another string
                        if (!text.includes(CALENDLY_URL + ":") && !text.includes(":" + CALENDLY_URL)) {
                            text = text.replace(CALENDLY_URL, CALENDLY_URL);
                        }
                    }
                    return text;
                })[0];
            
            // If no assistant response was found, provide a fallback
            if (!assistantResponse) {
                assistantResponse = `I apologize, but I wasn't able to process your request in time. Please try again or use my Calendly link to schedule a meeting: ${CALENDLY_URL}`;
            }
        } catch (error) {
            console.error("Error getting assistant response:", error);
            assistantResponse = `I apologize, but I wasn't able to process your request. Please try again or use my Calendly link to schedule a meeting: ${CALENDLY_URL}`;
        }

        // Determine if this was a calendar-related interaction
        const isCalendarRelated = assistantResponse.includes(CALENDLY_URL) || 
                                 assistantResponse.includes("appointment") || 
                                 assistantResponse.includes("schedule") ||
                                 assistantResponse.includes("booking");

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
                ipAddress: { S: event.requestContext?.http?.sourceIp || 'Not provided' },
                isCalendarRelated: { BOOL: isCalendarRelated }
            }
        };

        await dynamodb.send(new PutItemCommand(dynamoParams));
        console.log('Saved to DynamoDB:', chatId);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                response: assistantResponse,
                threadId: thread.id,
                isCalendarRelated
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
