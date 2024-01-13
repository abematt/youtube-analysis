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
    <div>
      <MainForm
        apiResults={apiResults}
        setApiResults={setApiResults}
        setComment={setComment}
        comment={comment}
        setSentiment={setSentiment}
      />
      <div className="flex flex-row justify-center">
        <TopComments comment={comment} />
        <SentimentReport sentiment={sentiment} />
      </div>
    </div>
  );
}

export default App;
