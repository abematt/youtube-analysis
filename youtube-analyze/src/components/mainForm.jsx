import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";

function MainForm({
  apiResuls,
  setApiResults,
  setComment,
  comment,
  setSentiment,
}) {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  function getYouTubeVideoID(url) {
    const regex =
      /(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

    const match = url.match(regex);
    if (match && match[2].length == 11) {
      console.log("matching");
      return match[2];
    } else {
      return "error";
    }
  }

  async function getComments(youtubeLink) {
    try {
      setStatus("Fetching Comments");
      setProgress(10);
      const videoLink = youtubeLink;
      const videoID = getYouTubeVideoID(videoLink);

      if (videoID === "error") {
        setStatus("Invalid Youtube Link");
        setProgress(0);
        return "Error";
      }

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments/${videoID}`
      );
      console.log(`Status: ${res.status}`);
      console.log("Body: ", res.data);
      if (res.status === 200) {
        let text = res.data.slice(0, 10);
        setApiResults(text);
        return text;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Classify Comments using Hugging Face API through Express
  async function classifyComments(data) {
    try {
      setStatus("Seperating Malayalam Comments");
      setProgress(40);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/classify`,
        data
      );
      console.log(`Status: ${res.status}`);
      console.log("Body: ", res.data);
      if (res.status === 200) {
        setComment(res.data);
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Translate Comments through HuggingFace API through Express
  async function translateComments(data) {
    try {
      setStatus("Translating Comments");
      setProgress(70);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/translate`,
        data
      );
      console.log(`Status: ${res.status}`);
      console.log("Body: ", res.data);
      if (res.status === 200) {
        setComment(res.data);
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Analyze Sentiment of Comments through HuggingFace API through Express
  async function sentimentComments(data) {
    try {
      setStatus("Analyzing Sentiment");
      setProgress(90);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/sentiment`,
        data
      );
      console.log(`Status: ${res.status}`);
      console.log("Body: ", res.data);
      if (res.status === 200) {
        setSentiment(res.data);
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getYoutubeComments = async () => {
    console.log("hi i'm here with a click");
    setComment("");
    setSentiment("");

    // Getting Youtube Comments
    // setStatus("Fetching Comments");
    // setProgress(10);
    // const videoLink = youtubeLink;
    // const videoID = getYouTubeVideoID(videoLink);
    // const youtubeResult = await getYoutubeInfo(videoID);
    // let text = youtubeResult.slice(0, 10);
    // setApiResults(text);

    let youtubeApiResult = await getComments(youtubeLink);
    console.log(youtubeApiResult);
    if (youtubeApiResult === "Error") {
      console.log("Invalid Link");
    } else {
      let classifiedComments = await classifyComments(youtubeApiResult);
      let translatedComments = await translateComments(classifiedComments);
      let sentiment = await sentimentComments(translatedComments);
    }

    // await translateComments(comment);
    // await sentimentComments(comment);

    // // Classifiying Comments
    // setStatus("Seperating Malayalam Comments");
    // setProgress(40);
    // let classifcation = await huggingLanguageClassification(text);
    // setComment(classifcation);
    // console.log("hi i'm under classification");

    // // Translating Comments
    // setStatus("Translating Comments");
    // setProgress(70);
    // const translatedCommentsList = await huggingTranslate(classifcation);
    // setComment(translatedCommentsList);
    // // console.log(classifcation);

    // // Sentiment Analysis of Comments
    // setProgress(90);
    // setStatus(
    //   "Analyzing Sentiment based on both English and Malayalam Comments"
    // );
    // const videoSentiment = await huggingSentiment(translatedCommentsList);
    // setSentiment(videoSentiment);
    // setProgress(100);
    // setStatus("Done!");
  };

  return (
    <div className="w-80 mx-auto lg:w-96">
      <Card className="border-2 border-slate-500">
        <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black">
          <CardTitle className="text-white">Youtube Analyzer</CardTitle>
          <CardDescription className="text-white">
            <p>
              Translate and Analyze Sentiment of Youtube (Malayalam) Comments
            </p>
            <a
              className="text-black"
              href="https://www.youtube.com/results?search_query=malayalam"
            >
              Click here for list of Malayalam videos to try
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-8">
          <form>
            <div className="grid w-full items-center gap-4">
              {/* <label htmlFor="video-link">Past Link Below</label> */}
              <Input
                onChange={(e) => setYoutubeLink(e.target.value)}
                placeholder="Enter youtube video link"
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button
                type="button"
                onClick={getYoutubeComments}
                variant="outline"
              >
                Get Analysis
              </Button>
            </div>
            <div>{status}</div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default MainForm;
