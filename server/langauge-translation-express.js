const { HfInference } = require("@huggingface/inference");
require('dotenv').config();

const huggingTranslate = async (rawText) => {
  console.log("Comment Translation")
  console.log("Data for Translation", rawText)
  const translated = [];
  const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

  for (const element of rawText) {
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
      translated.push({
        langauge: element.language,
        text: element.text,
        translatedText: translationResponse.translation_text,
        likes: element.likes,
      });
    }
  }
  return translated;
};

module.exports = { huggingTranslate };
