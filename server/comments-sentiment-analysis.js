const { HfInference } = require("@huggingface/inference");
require("dotenv").config();

const huggingSentiment = async (translatedText) => {
  console.log("Comment Sentiment Analysis");
  console.log("Data for Sentiment Analysis", translatedText)
  const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
  const sentences = [];

  for (const element of translatedText) {
    if (element.language != "en") {
      sentences.push(element.translatedText);
    }
    else {
      sentences.push(element.text);
    }
  }

  const sentimentClassification = await hf.textClassification({
    model: "SamLowe/roberta-base-go_emotions",
    inputs: sentences,
  });

  return sentimentClassification;
};

module.exports = { huggingSentiment };
