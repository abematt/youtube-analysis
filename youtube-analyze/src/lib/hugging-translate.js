import { HfInference } from "@huggingface/inference";

export const huggingTranslate = async (rawText) => {
  const translated = [];

  for (const element of rawText) {
    console.log(element)
    // console.log(element.langauge);
    if (element.language == "en") {
      translated.push(element);
    } else {
      const translationResponse = await hf.translation({
        model: "facebook/mbart-large-50-many-to-many-mmt",
        inputs: element.text,
        parameters: {
          src_lang: "ml_IN",
          tgt_lang: "en_XX",
        },
      });
      console.log(translationResponse);
      translated.push({
        langauge : element.language,
        text : element.text,
        translatedText : translationResponse.translation_text,
      });
    }
  }
  return translated;
};
