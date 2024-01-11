import { HfInference } from "@huggingface/inference";

export const huggingSentiment = async (translatedText) => {
  const sentences = [];
  
  console.log("Right before sentment",translatedText)

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
