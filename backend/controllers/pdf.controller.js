const pdfParse =
  require("pdf-parse");

const prisma =
  require("../services/prisma");

const {
  getAuth,
} = require("@clerk/express");

const {
  summarizePDF,
} = require("../services/ai.service");

const summarizePDFController =
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
            "Please upload a PDF",
        });
      }

      const pdfData =
        await pdfParse(
          req.file.buffer
        );

      const summary =
        await summarizePDF(
          pdfData.text
        );

      await prisma.history.create({
        data: {
          type:
            "PDF_SUMMARIZER",
          prompt:
            req.file.originalname,
          result:
            summary,
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

      return res.json({
        success: true,
        summary,
        remainingCredits:
          user.credits - 2,
      });

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
  summarizePDFController,
};