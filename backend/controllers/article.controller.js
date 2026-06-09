const { getAuth } = require("@clerk/express");

const {
  generateArticle,
} = require("../services/ai.service");

const prisma = require("../services/prisma");

const createArticle = async (req, res) => {
  try {

    const { title, length } = req.body;

    const { userId } = getAuth(req);

    console.log("USER ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!dbUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (dbUser.credits <= 0) {
      return res.status(403).json({
        success: false,
        message: "No credits remaining",
      });
    }

    const article = await generateArticle(
      title,
      length
    );

    await prisma.history.create({
      data: {
        type: "ARTICLE",
        prompt: title,
        result: article,
        userId: dbUser.id,
      },
    });

    await prisma.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    return res.status(200).json({
      success: true,
      article,
      remainingCredits: dbUser.credits - 1,
    });

  } catch (error) {

    console.error(
      "Article Generation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createArticle,
};