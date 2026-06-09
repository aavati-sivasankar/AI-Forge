const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateArticle = async (title, length) => {
  const prompt = `
  Write a professional article.

  Title: ${title}

  Length: ${length} words.
  `;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = {
  generateArticle,
};