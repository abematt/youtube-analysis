import axios from 'axios'

export const getYoutubeInfo = async (videoLink) => {

    
    try {
        const response = await axios.get(`http://127.0.0.1:8000/comments?videoId=${videoLink}`)
        return response.data;
    } catch (error) {
        return error;
    }

};