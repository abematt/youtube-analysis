const {google} = require('googleapis');
const { get } = require('http');
require('dotenv').config();

const youtube = google.youtube({
    version:  'v3',
    auth: process.env.YOUTUBE_API_KEY,
});


const getComments = async (rawText) => {
    const videoId = rawText.params.videoId;
        const response = await youtube.commentThreads.list({
        part: 'snippet',
        videoId: videoId,
        maxResults: 100,
      });
  
      const commentList = response.data.items.map(item => ({
        textDisplay: item.snippet.topLevelComment.snippet.textDisplay,
        likeCount: item.snippet.topLevelComment.snippet.likeCount,
      }));
  
      commentList.sort((a, b) => b.likeCount - a.likeCount);
  
      return commentList;

  };

  module.exports = getComments;