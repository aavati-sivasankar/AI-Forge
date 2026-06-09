const {
  getAuth,
} = require("@clerk/express");

const prisma =
  require("../services/prisma");

const {
  removeBackground,
} = require(
  "../services/background.service"
);

const removeBackgroundController =
  async (req, res) => {

    try {

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
          message:
            "User not found",
        });
      }

      if (user.credits < 2) {
        return res.status(403).json({
          success: false,
          message:
            "Not enough credits",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Please upload an image",
        });
      }

      const resultImage =
        await removeBackground(
          req.file.buffer
        );

      await prisma.history.create({
        data: {
          type:
            "BACKGROUND_REMOVER",
          prompt:
            req.file.originalname,
          result:
            "Background Removed",
          userId:
            user.id,
        },
      });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          credits: {
            decrement: 2,
          },
        },
      });

      res.set(
        "Content-Type",
        "image/png"
      );

      return res.send(
        resultImage
      );

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

};

module.exports = {
  removeBackgroundController,
};