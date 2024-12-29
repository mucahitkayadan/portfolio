const { OpenAI } = require("openai");

exports.handler = async (event) => {
  console.log("Event received:", JSON.stringify(event, null, 2));
  
  const headers = {
    "Access-Control-Allow-Origin": "*",
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
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = JSON.parse(event.body);
    const { message } = body;
    console.log("Received message:", message);

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
      .map(msg => msg.content[0].text.value)[0];

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
