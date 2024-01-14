import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";
import * as React from "react";

import { emotionColors } from "../lib/emotionColors";

function SentimentReport({ sentiment }) {
  return (
    <div className="mt-5">
      {sentiment && sentiment.length > 0 ? (
        <Card className="w-auto rounded-md border-2 border-slate-500">
          <CardHeader>
            <h1 className="text-2xl">Sentiment Report</h1>
          </CardHeader>
          <Separator className="bg-white" />
          <CardContent className="mt-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Badge
                  className="my-0 mx-auto px-14 border-2 border-slate-500 "
                  style={{
                    backgroundColor:
                      emotionColors[sentiment[0].label] || "#84cc16",
                    color: "black",
                  }}
                >
                  <h1 className="text-xl mb-2">{sentiment[0].label}</h1>
                </Badge>
                {/* <p>{sentiment[0].score}</p> */}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Badge
                  className="my-0 mx-auto px-14 border-2 border-slate-500"
                  style={{
                    backgroundColor:
                      emotionColors[sentiment[1].label] || "#84cc16",
                    color: "black",
                  }}
                >
                  <h1 className="text-xl mb-2">{sentiment[1].label}</h1>
                </Badge>

                {/* <p>{sentiment[1].score}</p> */}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Badge
                  className="my-0 mx-auto px-14 border-2 border-slate-500"
                  style={{
                    backgroundColor:
                      emotionColors[sentiment[2].label] || "#84cc16",
                    color: "black",
                  }}
                >
                  <h1 className="text-xl mb-2">{sentiment[2].label}</h1>
                </Badge>
                {/* <p>{sentiment[2].score}</p> */}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

export default SentimentReport;
