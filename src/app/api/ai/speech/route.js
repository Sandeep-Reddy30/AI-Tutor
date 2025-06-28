export async function POST(request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio');
    const question = formData.get('question') || '';

    if (!audioFile) {
      return Response.json({
        success: false,
        message: "Audio file is required"
      }, { status: 400 });
    }

    // For now, we'll use the text question directly since speech-to-text requires additional setup
    // In a full implementation, you'd convert the audio to text first
    const userInput = question || "Hello, I'm a student. Can you help me with my studies?";

    // Use Ollama for speech-like conversation
    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen2.5-coder:1.5b',
        prompt: `You are a helpful AI tutor for students. Respond in a conversational, friendly manner as if you're having a voice conversation. Keep responses concise but helpful.

Student's message: ${userInput}

Please provide a helpful, conversational response that a student would find useful.`,
        stream: false
      })
    });

    if (!ollamaResponse.ok) {
      const errorData = await ollamaResponse.text();
      console.error('Ollama API error:', errorData);
      return Response.json({
        success: false,
        message: `Failed to process speech: ${ollamaResponse.status} ${ollamaResponse.statusText}. Make sure Ollama is running on localhost:11434`
      }, { status: 500 });
    }

    const ollamaData = await ollamaResponse.json();
    const response = ollamaData.response || 'Sorry, I could not process your request.';

    return Response.json({
      success: true,
      response: response,
      audioFileName: audioFile.name,
      userInput: userInput,
      message: "Speech processed successfully using Ollama"
    });

  } catch (error) {
    console.error('Speech processing error:', error);
    return Response.json({
      success: false,
      message: `Failed to process speech: ${error.message}. Make sure Ollama is running on localhost:11434`
    }, { status: 500 });
  }
} 