const { getAuth } = require("@clerk/express");
const prisma = require("../services/prisma");

const getDashboardData = async (req, res) => {
  try {

    const { userId } = getAuth(req);
     console.log("AUTH:", getAuth(req));

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    console.log("Searching User:",userId);
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        history: true,
      },
    });

    console.log("Found User:",user);

    if (!user) {

      return res.status(200).json({
        success: false,
        message: "User syncing...",
      });

    }

    const articleCount =
      user.history.filter(
        item => item.type === "ARTICLE"
      ).length;

    return res.status(200).json({
      success: true,

      user: {
        credits: user.credits,
        plan: user.plan,
        firstName: user.firstName,
      },

      stats: {
        articles: articleCount,
        totalHistory: user.history.length,
      },
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardData,
};