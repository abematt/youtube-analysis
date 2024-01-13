const { HfInference } = require("@huggingface/inference");
require("dotenv").config();

const huggingSentiment = async (translatedText) => {
  const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
  const sentences = [];

  console.log("Right before sentment", translatedText);

  for (const element of translatedText) {
    if (element.language != "en") {
      sentences.push(element.translatedText);
    }
  }
  console.log(sentences);

  const sentimentClassification = await hf.textClassification({
    model: "SamLowe/roberta-base-go_emotions",
    inputs: sentences,
  });

  return sentimentClassification;
};

module.exports = { huggingSentiment };
