const { getAuth } =
  require("@clerk/express");

const prisma =
  require("../services/prisma");

const {
  generateBlogTitles,
} = require("../services/ai.service");

const createBlogTitles =
  async (req, res) => {

    try {

        console.log("BODY:", req.body);
    console.log("HEADERS:", req.headers);

      const {
        keyword,
        category,
      } = req.body;

      const { userId } =
        getAuth(req);

      const user =
        await prisma.user.findUnique({
          where: {
            clerkId: userId,
          },
        });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.credits <= 0) {
        return res.status(403).json({
          success: false,
          message:
            "No credits remaining",
        });
      }

      const result =
        await generateBlogTitles(
          keyword,
          category
        );

      await prisma.history.create({
        data: {
          type: "BLOG_TITLE",
          prompt:
            `${keyword} - ${category}`,
          result,
          userId: user.id,
        },
      });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      return res.json({
        success: true,
        titles: result,
        remainingCredits:
          user.credits - 1,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
};

module.exports = {
  createBlogTitles,
};