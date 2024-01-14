import { useState } from "react";

import "./App.css";

import MainForm from "./components/mainForm";
import TopComments from "./components/topComments";
import SentimentReport from "./components/sentimentReport";

function App() {
  const [apiResults, setApiResults] = useState("");
  const [comment, setComment] = useState("");
  const [sentiment, setSentiment] = useState("");

  return (
    <div className="min-h-screen flex flex-col py-4">
      <MainForm
        apiResults={apiResults}
        setApiResults={setApiResults}
        setComment={setComment}
        comment={comment}
        setSentiment={setSentiment}
      />
      <div className="flex flex-col justify-center lg:flex lg:flex-row lg:flex-wrap">
        <TopComments comment={comment} />
        <SentimentReport sentiment={sentiment} />
      </div>
    </div>
  );
}

export default App;
