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

import { getYoutubeInfo } from "../lib/youtube-api";
import { huggingTranslate } from "../lib/hugging-translate";
import { huggingLanguageClassification } from "../lib/language-detection";
import { huggingSentiment } from "../lib/sentiment-detection";

function MainForm({ setApiResults, setComment, comment }) {
  const [youtubeLink, setYoutubeLink] = useState("");

  const getYoutubeComments = async () => {
    console.log("hi i'm here with a click")
    const videoLink = youtubeLink;
    const youtubeResult = await getYoutubeInfo(videoLink);
    let text = youtubeResult.slice(0, 10);
    setApiResults(text);

    // Classifiying Comments
    let classifcation = await huggingLanguageClassification(text);
    setComment(classifcation);
    console.log(classifcation)
    console.log("hi i'm under classification")
    // Translating Comments
    const translatedCommentsList = await huggingTranslate(classifcation);
    setComment(translatedCommentsList);
    // console.log(classifcation);

    const videoSentiment = await huggingSentiment(translatedCommentsList);
    console.log(videoSentiment )
  };
  return (
    <>
      <Card className="w-[350px] h-[350px]">
        <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black">
          <CardTitle>Youtube Analyzer</CardTitle>
          <CardDescription>
            Get a full analysis of youtube video that isn't in your language
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-8">
          <form>
            <div className="grid w-full items-center gap-4">
              <label htmlFor="video-link">Video Link</label>
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
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default MainForm;
