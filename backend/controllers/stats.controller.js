const prisma =
  require("../services/prisma");

const getStats =
  async (req, res) => {

    try {

      const totalUsers =
        await prisma.user.count();

      return res.status(200).json({
        success: true,

        stats: {
          totalUsers,
          totalFeatures: 5,
        },
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

};

module.exports = {
  getStats,
};