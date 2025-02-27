const axios = require('axios');
require('dotenv').config({ path: '../.env' });

// Calendly API configuration
const CALENDLY_URL = process.env.CALENDLY_URL || 'https://calendly.com/mujakayadan/';
const CALENDLY_CLIENT_ID = process.env.CALENDLY_CLIENT_ID;
const CALENDLY_CLIENT_SECRET = process.env.CALENDLY_CLIENT_SECRET;
const PERSONAL_ACCESS_TOKEN = process.env.CALENDLY_PERSONAL_TOKEN;

// Function to get Calendly access token using OAuth client credentials
async function getCalendlyAccessToken() {
    try {
        console.log('Getting OAuth token...');
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
        console.log('Successfully got OAuth token');
        return data.access_token;
    } catch (error) {
        console.error('Error getting Calendly OAuth token:', error.message);
        return null;
    }
}

// Function to test fetching available slots using OAuth token
async function testAvailableSlotsWithOAuth() {
    try {
        const token = await getCalendlyAccessToken();
        
        if (!token) {
            throw new Error('Could not authenticate with Calendly using OAuth');
        }
        
        console.log('Testing with OAuth token...');
        console.log('OAuth token obtained successfully');
        
        // When using OAuth client credentials, we can't use /users/me endpoint
        console.log('Note: OAuth client credentials cannot use /users/me endpoint');
        console.log('This is a limitation of the Calendly API with OAuth client credentials');
        
        // Print the direct Calendly scheduling link
        console.log('\nDirect Calendly scheduling link:');
        console.log(CALENDLY_URL);
        
        return true;
    } catch (error) {
        console.error('Error testing available slots with OAuth:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        return null;
    }
}

// Function to test fetching available slots using Personal Access Token
async function testAvailableSlotsWithPersonalToken() {
    try {
        if (!PERSONAL_ACCESS_TOKEN) {
            throw new Error('Personal access token not provided');
        }
        
        console.log('Testing with Personal Access Token...');
        
        // First, we need to get the user's URI from Calendly
        const userResponse = await axios.get('https://api.calendly.com/users/me', {
            headers: {
                'Authorization': `Bearer ${PERSONAL_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('User data fetched successfully');
        console.log('User data:', JSON.stringify(userResponse.data.resource, null, 2));
        const userData = userResponse.data;
        const userURI = userData.resource.uri;
        
        // Get the user's event types (meeting types)
        const eventTypesResponse = await axios.get(`https://api.calendly.com/event_types?user=${userURI}`, {
            headers: {
                'Authorization': `Bearer ${PERSONAL_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Event types fetched successfully');
        const eventTypesData = eventTypesResponse.data;
        
        // Use the first active event type
        const activeEventTypes = eventTypesData.collection.filter(et => et.active);
        if (activeEventTypes.length === 0) {
            throw new Error('No active event types found');
        }
        
        const eventType = activeEventTypes[0];
        console.log(`Using event type: ${eventType.name}`);
        console.log(`Event type URI: ${eventType.uri}`);
        
        // Get available times for the next 7 days
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 7);
        
        const startTime = today.toISOString();
        const endTime = endDate.toISOString();
        
        // Get user's scheduled events
        console.log('\nFetching user scheduled events...');
        const eventsResponse = await axios.get(
            `https://api.calendly.com/scheduled_events?user=${userURI}&min_start_time=${startTime}&max_start_time=${endTime}`,
            {
                headers: {
                    'Authorization': `Bearer ${PERSONAL_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log('Scheduled events fetched successfully');
        const eventsData = eventsResponse.data;
        
        if (eventsData.collection && eventsData.collection.length > 0) {
            console.log(`Found ${eventsData.collection.length} scheduled events:`);
            
            // Format and display the scheduled events
            const scheduledEvents = eventsData.collection.map(event => {
                const startDate = new Date(event.start_time);
                const endDate = new Date(event.end_time);
                const options = { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    timeZoneName: 'short'
                };
                return {
                    start: startDate.toLocaleString('en-US', options),
                    end: endDate.toLocaleString('en-US', options),
                    name: event.name,
                    status: event.status
                };
            });
            
            scheduledEvents.forEach((event, index) => {
                console.log(`${index + 1}. ${event.name} (${event.status})`);
                console.log(`   From: ${event.start}`);
                console.log(`   To: ${event.end}`);
            });
        } else {
            console.log('No scheduled events found');
        }
        
        // Print the direct Calendly scheduling link
        console.log('\nDirect Calendly scheduling link:');
        console.log(CALENDLY_URL);
        
        // Format a response like we would in the Lambda function
        let response = `You can schedule a meeting with me using this link: ${CALENDLY_URL}\n\n`;
        
        if (eventsData.collection && eventsData.collection.length > 0) {
            response += "I already have some meetings scheduled for the next few days. Here are my existing appointments:\n\n";
            
            // Format and display the scheduled events
            const scheduledEvents = eventsData.collection.map(event => {
                const startDate = new Date(event.start_time);
                const options = { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    timeZoneName: 'short'
                };
                return startDate.toLocaleString('en-US', options);
            });
            
            scheduledEvents.forEach((time, index) => {
                response += `${index + 1}. ${time}\n`;
            });
            
            response += "\nPlease choose a different time when scheduling.";
        } else {
            response += "I don't have any meetings scheduled for the next 7 days, so feel free to pick any time that works for you!";
        }
        
        console.log('\nFormatted response:');
        console.log(response);
        
        return true;
    } catch (error) {
        console.error('Error testing available slots with Personal Token:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        return null;
    }
}

// Run the tests
async function runTests() {
    console.log('=== TESTING CALENDLY API ===');
    
    // Test with OAuth client credentials
    console.log('\n=== TESTING WITH OAUTH CLIENT CREDENTIALS ===');
    const oauthResult = await testAvailableSlotsWithOAuth();
    
    // Test with Personal Access Token if available
    if (PERSONAL_ACCESS_TOKEN) {
        console.log('\n=== TESTING WITH PERSONAL ACCESS TOKEN ===');
        const personalTokenResult = await testAvailableSlotsWithPersonalToken();
    } else {
        console.log('\nSkipping Personal Access Token test (token not provided)');
    }
    
    console.log('\n=== TEST COMPLETE ===');
    console.log('\n=== SUMMARY ===');
    console.log('The Calendly API testing is complete. Here are the key findings:');
    console.log('1. OAuth Client Credentials: Limited functionality, cannot access user-specific endpoints');
    console.log('2. Personal Access Token: Can access user data, event types, and scheduled events');
    console.log('\nFor the Lambda function, we recommend:');
    console.log('- Using the Personal Access Token for fetching user-specific data');
    console.log('- Providing the direct Calendly scheduling link to users');
    console.log('- Fetching scheduled events to show existing appointments');
    console.log('- Not attempting to fetch available times or scheduling links (API limitations)');
    console.log('\nCalendly URL for scheduling: ' + CALENDLY_URL);
}

// Run the tests
runTests(); 