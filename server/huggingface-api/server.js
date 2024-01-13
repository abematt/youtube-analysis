const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const { huggingLanguageClassification } = require("./language-detection-express.js");
const { huggingTranslate } = require("./langauge-translation-express.js");
const {huggingSentiment} = require("./comments-sentiment-analysis.js");

const getComments = require("./youtube-api.js");
app.use(cors());   
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/api/comments/:videoId', async (req,res,next) => {
  try {
    const youtubeComments = await getComments(req);
    res.json(youtubeComments);
  } catch (error) {
    next(error);
  }
});

app.post("/api/classify", async (req, res, next) => {
  try {
    const classifications = await huggingLanguageClassification(req.body); 
    res.json(classifications);
  } catch (error) {
    next(error);
  }
});

app.post("/api/translate", async (req, res, next) => {
    try {
        const translated = await huggingTranslate(req.body);
        res.json(translated);
    } catch (error) {
        next(error);
    }
});

app.post("/api/sentiment", async (req, res, next) => {
    try {
        const sentiment = await huggingSentiment(req.body);
        res.json(sentiment);
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack to console
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
