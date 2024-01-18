# Youtube Analysis (Malayalam Language)

This application will take a youtube link and process the comments from it. The processing pipeline involves fetching all comments , seperating them by english and non english, translating the non english comments (currently only Malayalam) and then putting together both english and translated comments to perform sentiment analysis. The language process is done leveraging Huggingface.js and Youtube Data APIs. 

Deployed at: [https://main--effervescent-bombolone-b2ac4f.netlify.app/](https://main--effervescent-bombolone-b2ac4f.netlify.app/)

## Overview

This app was created to explore various technologies and frameworks. The following components were used:

- **Vite** [https://vitejs.dev/] as a development server/bundler
- **shdcn/ui** [https://ui.shadcn.com/] for component styling
- **Google's Developer API** [https://developers.google.com/youtube/v3] for fetching YouTube comments
- **Huggingface.js** [https://huggingface.co/docs/huggingface.js/index] for accessing inference APIs for LLM models

## Basic Pipeline

1. Paste a YouTube video link (Currently built around Malayalam language videos)
2. The link is parsed, and using the video id, the YouTube comments are sourced.
3. The top 10 comments based on likes are sliced and passed to a combination of AI models
4. Comments are passed to a *papluca/xlm-roberta-base-language-detection* model for language detection
5. Based on language classification, the rest are assumed to be in Malayalam. Non-English words are passed to *facebook/mbart-large-50-many-to-many-mmt* model for translation
6. Translated sentences (both English and non-English) are passed to *SamLowe/roberta-base-go_emotions* model for sentiment analysis
7. The top 3 detected emotions are displayed.

## Limitations

1. Sentiment detection is done only on 10 comments to avoid exceeding API usage limits
2. Issues with detecting and translating transliterated sentences

## Main Takeaways

One interesting observation is the prevalence of transliteration in Malayalam sentences. Many YouTube commenters, especially young people, tend to type Malayalam using English alphabets. This phonetic representation of foreign words in the English alphabet is an area in AI that hasn't been explored much. This issue extends beyond Malayalam to many languages. Training a model to detect and translate transliteration could be an interesting avenue to explore.
