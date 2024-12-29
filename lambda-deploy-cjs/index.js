const { OpenAI } = require("openai");

exports.handler = async (event) => {
  console.log("Event received:", JSON.stringify(event, null, 2));
  
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = JSON.parse(event.body);
    const { message } = body;
    console.log("Received message:", message);

    // Create a new thread for each conversation
    const thread = await openai.beta.threads.create();
    console.log("Created new thread:", thread.id);

    // Add the user"s message to the thread
    await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: message
      }
    );

    // Create a run with the assistant
    const run = await openai.beta.threads.runs.create(
      thread.id,
      {
        assistant_id: process.env.OPENAI_ASSISTANT_ID,
      }
    );

    // Poll for the run completion
    let runStatus = await openai.beta.threads.runs.retrieve(
      thread.id,
      run.id
    );

    // Wait for the assistant to complete its response
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

    // Get the assistant"s response
    const messages = await openai.beta.threads.messages.list(
      thread.id
    );

    // Get the latest assistant response
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
