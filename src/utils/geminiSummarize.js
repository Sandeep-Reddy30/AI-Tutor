import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function summarizeText(text) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are an expert YouTube video analyst. Based on the following information, create a comprehensive and engaging summary:

${text}

Please provide:
1. A creative analysis of what this video might be about
2. Potential educational value and key takeaways
3. Target audience and skill level
4. Why someone might want to watch this video
5. Related topics or subjects it might cover

Make it engaging and informative, as if you're recommending the video to a student.`;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw new Error('Failed to generate summary');
  }
} 