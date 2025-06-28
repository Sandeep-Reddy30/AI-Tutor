export async function GET() {
  try {
    if (!process.env.GROK_API_KEY) {
      return Response.json({
        success: false,
        message: "Grok API key not found in environment variables"
      });
    }

    const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'grok-3-latest',
        messages: [
          {
            role: 'user',
            content: 'Say hello and confirm you are working.'
          }
        ],
        stream: false,
        temperature: 0
      })
    });

    if (!grokResponse.ok) {
      const errorText = await grokResponse.text();
      return Response.json({
        success: false,
        message: `Grok API error: ${grokResponse.status} ${grokResponse.statusText}`,
        details: errorText
      });
    }

    const data = await grokResponse.json();
    return Response.json({
      success: true,
      message: "Grok API is working!",
      response: data.choices[0]?.message?.content || 'No response'
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: `Test failed: ${error.message}`
    });
  }
} 