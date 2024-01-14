const {google} = require('googleapis');
const { get } = require('http');
require('dotenv').config();

const youtube = google.youtube({
    version:  'v3',
    auth: process.env.YOUTUBE_API_KEY,
});

const getComments = async (rawText) => {
    const videoId = rawText.params.videoId;
    let pageToken
    let commentList = [];
    do {
        const response = await youtube.commentThreads.list({
        part: 'snippet',
        videoId: videoId,
        maxResults: 200,
        pageToken: pageToken
      });
  
      const commentsReturned = response.data.items.map(item => ({
        textDisplay: item.snippet.topLevelComment.snippet.textDisplay,
        likeCount: item.snippet.topLevelComment.snippet.likeCount,
      }));
      
      commentList = commentList.concat(commentsReturned);
      pageToken = response.data.nextPageToken;
    } while (pageToken);

    commentList.sort((a, b) => b.likeCount - a.likeCount);
  
      return commentList;

  };

  module.exports = getComments;