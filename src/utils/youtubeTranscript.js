import { google } from 'googleapis';

const youtube = google.youtube('v3');

export async function fetchVideoInfo(videoId) {
  try {
    console.log('Fetching video info for ID:', videoId);
    
    const response = await youtube.videos.list({
      key: process.env.GEMINI_API_KEY,
      part: 'snippet,statistics',
      id: videoId
    });

    if (response.data.items && response.data.items.length > 0) {
      const video = response.data.items[0];
      const snippet = video.snippet;
      const statistics = video.statistics;
      
      console.log('Video info fetched successfully');
      
      return {
        title: snippet.title,
        description: snippet.description,
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        viewCount: statistics.viewCount,
        likeCount: statistics.likeCount,
        duration: snippet.duration
      };
    } else {
      console.log('No video found');
      return null;
    }
  } catch (e) {
    console.error('Error fetching video info:', e);
    return null;
  }
}

export async function fetchTranscript(videoId) {
  try {
    console.log('Attempting to fetch video info for ID:', videoId);
    
    // Try to get actual video info first
    const videoInfo = await fetchVideoInfo(videoId);
    
    if (videoInfo) {
      // We have real video info, create a proper summary
      const content = `
YouTube Video Analysis

Title: ${videoInfo.title}
Channel: ${videoInfo.channelTitle}
Published: ${videoInfo.publishedAt}
Views: ${videoInfo.viewCount}
Likes: ${videoInfo.likeCount}
Video URL: https://www.youtube.com/watch?v=${videoId}

Description:
${videoInfo.description}

Please provide a comprehensive summary of this YouTube video based on the title, channel, and description above. Include:
- Main topics and themes covered
- Key points and takeaways
- Target audience
- Educational value
- Why this video would be useful for students

Make the summary engaging and informative.
      `.trim();
      
      console.log('Real video info used for summary');
      return content;
    } else {
      // No video info available, return null to indicate failure
      console.log('No video info available');
      return null;
    }
    
  } catch (e) {
    console.error('Error in fetchTranscript:', e);
    return null;
  }
} 