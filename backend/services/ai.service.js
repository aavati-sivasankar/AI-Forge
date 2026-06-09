const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});
const summarizePDF = async (
  pdfText
) => {

  const prompt = `
You are an expert document summarizer.

Summarize the following PDF.

Provide:

1. Executive Summary

2. Key Points

3. Important Concepts

4. Conclusion

PDF Content:

${pdfText}
`;

  const response =
    await client.chat.completions.create({
      model:
        "google/gemma-4-31b-it:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  return response
    .choices[0]
    .message
    .content;
};
const generateArticle = async (
  title,
  length
) => {

  const prompt = `
Write a professional article.

Title: ${title}

Length: ${length} words.
`;

  const response =
    await client.chat.completions.create({
      model:
        "google/gemma-4-31b-it:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  return response
    .choices[0]
    .message
    .content;
};

const generateBlogTitles = async (
  keyword,
  category
) => {

  const prompt = `
Generate 10 SEO-friendly blog titles.

Keyword: ${keyword}

Category: ${category}

Return only the titles.
`;

  const response =
    await client.chat.completions.create({
      model:
        "google/gemma-4-31b-it:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  return response
    .choices[0]
    .message
    .content;
};

const analyzeResumeAI = async (
  resumeText
) => {

  const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the resume and provide:

# ATS Score
(score out of 100)

# Strengths
(Bullet Points)

# Weaknesses
(Bullet Points)

# Missing Skills
(Bullet Points)

# Suggestions
(Bullet Points)

Resume:

${resumeText}
`;

  const response =
    await client.chat.completions.create({
      model:
        "google/gemma-4-31b-it:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  return response
    .choices[0]
    .message
    .content;
};

module.exports = {
  generateArticle,
  generateBlogTitles,
  analyzeResumeAI,
  summarizePDF,
};