import {useState} from "react";

import "./App.css";

import MainForm from "./components/mainForm";
import TopComments from "./components/topComments";


function App() {
  const [apiResults, setApiResults] = useState('');
  const [comment,setComment] = useState('');

  return (
    <div>
      <MainForm setApiResults={setApiResults} setComment={setComment} comment={comment}/>
      <div className="w-full">
        <TopComments comment={comment}/>

      </div>
      
      </div>
  );
}

export default App;
