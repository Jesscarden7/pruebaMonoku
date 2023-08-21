const { Configuration, OpenAIApi } = require("openai");
const moment = require("moment");

const DailyEntry = require("../models/dailyEntry");

const moodService = {
  checkMood: async (mood, entry, userId) => {
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      const feelingsMapping = {
        Feliz: "😄",
        Triste: "😢",
        Enojado: "😡",
        Neutral: "😐",
        Shock: "😱",
      };

      const sentimentAnalysisPrompt = `Genera un JSON con dos propiedades, el sentimiento restringido a estas opciones (Feliz, Triste, Enojado, Neutral, Shock) y un corto análisis basado en la siguiente frase: \n${entry}\nAnalisis`;

      let sentiment;

      try {
        const gptResponse = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: sentimentAnalysisPrompt,
          temperature: 0,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        sentiment = gptResponse.data.choices[0]["text"];

        console.log(gptResponse);
      } catch (error) {
        console.log(error);
        return {
          msg: "error llamando a chat gtp",
          isSuccesful: false,
        };
      }

      sentiment = sentiment.replace(":", "");

      const parseSentiment = JSON.parse(sentiment);

      emji = feelingsMapping[parseSentiment.sentimiento];
      const dailyEntry = new DailyEntry({
        userId,
        date: moment().format("YYYY-MM-DD"),
        entry,
        analysis: parseSentiment.analisis,
        emoji: feelingsMapping[parseSentiment.sentimiento],
        mood:
          mood === parseSentiment.sentimiento
            ? mood
            : parseSentiment.sentimiento,
      });

      // Guardar en DB
      await dailyEntry.save();

      const response = {
        type: "success",
        emoji:
          mood === parseSentiment.sentimiento
            ? feelingsMapping[mood]
            : feelingsMapping[parseSentiment.sentimiento],
        analisis: parseSentiment.analisis,
        sentimiento: parseSentiment.sentimiento,
        isSuccesful: true,
      };

      return response;
    } catch (error) {
      console.log(error);
      return {
        msg: "error",
        isSuccesful: false,
      };
    }
  },
  dailyEntryList: async (userId) => {
    try {
      const include = {
        createdAt: 0,
        updatedAt: 0,
      };

      const list = await DailyEntry.find({ userId }, include);

      const response = {
        type: "success",
        list,
        isSuccesful: true,
      };

      return response;
    } catch (error) {
      console.log(error);
      return {
        msg: "error",
        isSuccesful: false,
      };
    }
  },
};

module.exports = moodService;
