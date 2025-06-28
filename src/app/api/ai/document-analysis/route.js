import { NextRequest } from 'next/server';
import mammoth from 'mammoth';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const question = formData.get('question') || 'Analyze this document and provide key insights';

    if (!file) {
      return Response.json({
        success: false,
        message: "No file uploaded"
      }, { status: 400 });
    }

    // Extract text from different file types
    let documentText = '';
    const fileName = file.name.toLowerCase();

    try {
      if (fileName.endsWith('.pdf')) {
        // For now, we'll handle PDFs as basic text extraction
        documentText = `PDF Document: ${file.name}\n\nThis is a PDF document that needs to be analyzed. The content extraction is currently limited. Please consider uploading a Word document for better analysis.`;
      } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await mammoth.extractRawText({ buffer });
        documentText = result.value;
      } else if (fileName.endsWith('.txt')) {
        const text = await file.text();
        documentText = text;
      } else if (fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) {
        documentText = `PowerPoint presentation: ${file.name}`;
      } else {
        return Response.json({
          success: false,
          message: "Unsupported file type. Please upload PDF, DOC, DOCX, TXT, PPT, or PPTX files."
        }, { status: 400 });
      }
    } catch (parseError) {
      console.error('File parsing error:', parseError);
      return Response.json({
        success: false,
        message: "Could not parse the document. Please try a different file or check if the file is corrupted."
      }, { status: 400 });
    }

    if (!documentText.trim()) {
      return Response.json({
        success: false,
        message: "Could not extract text from the document. Please try a different file."
      }, { status: 400 });
    }

    // Use Ollama local API for document analysis
    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen2.5-coder:1.5b', // Faster, smaller model
        prompt: `You are an expert document analyst. Please analyze the following document and answer the question.

Document Content:
${documentText}

Question: ${question}

Please provide a comprehensive analysis and answer to the question based on the document content.`,
        stream: false
      })
    });

    if (!ollamaResponse.ok) {
      const errorData = await ollamaResponse.text();
      console.error('Ollama API error:', errorData);
      return Response.json({
        success: false,
        message: `Failed to analyze document: ${ollamaResponse.status} ${ollamaResponse.statusText}. Make sure Ollama is running on localhost:11434`
      }, { status: 500 });
    }

    const ollamaData = await ollamaResponse.json();
    const analysis = ollamaData.response || 'No analysis generated';

    return Response.json({
      success: true,
      analysis: analysis,
      fileName: file.name,
      documentLength: documentText.length,
      message: "Document analyzed successfully using Ollama"
    });

  } catch (error) {
    console.error('Document analysis error:', error);
    return Response.json({
      success: false,
      message: `Failed to analyze document: ${error.message}. Make sure Ollama is running on localhost:11434`
    }, { status: 500 });
  }
} 