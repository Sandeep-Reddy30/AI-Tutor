import { fetchTranscript } from '@/utils/youtubeTranscript';
import { summarizeText } from '@/utils/geminiSummarize';

export async function POST(request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return Response.json({
        success: false,
        message: "YouTube URL is required"
      }, { status: 400 });
    }

    // Extract video ID from YouTube URL
    const videoId = url.split('v=')[1]?.split('&')[0];
    
    console.log('URL:', url);
    console.log('Video ID:', videoId);
    
    if (!videoId) {
      return Response.json({
        success: false,
        message: "Invalid YouTube URL format"
      }, { status: 400 });
    }

    // Fetch video info (title, description, etc.)
    console.log('Fetching video info for video ID:', videoId);
    const videoContent = await fetchTranscript(videoId);
    
    console.log('Video content result:', videoContent ? 'Success' : 'Failed');
    
    if (!videoContent) {
      return Response.json({
        success: false,
        message: "Could not fetch video information. The YouTube Data API may not be enabled or the video may be private/unavailable. Please check your API key and ensure the YouTube Data API v3 is enabled in your Google Cloud Console."
      }, { status: 404 });
    }

    // Generate summary using Gemini AI
    console.log('Generating summary...');
    const summary = await summarizeText(videoContent);

    return Response.json({
      success: true,
      summary: summary,
      videoUrl: url,
      videoId: videoId,
      message: "Summary generated successfully"
    });

  } catch (error) {
    console.error('YouTube summary error:', error);
    return Response.json({
      success: false,
      message: `Failed to generate summary: ${error.message}`
    }, { status: 500 });
  }
} 