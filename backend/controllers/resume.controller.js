const pdfParse = require("pdf-parse");

const prisma = require("../services/prisma");

const { getAuth } =
  require("@clerk/express");

const {
  analyzeResumeAI,
} = require("../services/ai.service");

console.log("PDF PARSE:", pdfParse);
const analyzeResume =
  async (req, res) => {

    try {

      const { userId } =
        getAuth(req);

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

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

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Please upload a PDF file",
        });
      }

      const pdfData =
        await pdfParse(
          req.file.buffer
        );

      const extractedText =
        pdfData.text;

      const analysis =
        await analyzeResumeAI(
          extractedText
        );

      await prisma.history.create({
        data: {
          type:
            "RESUME_ANALYZER",
          prompt:
            req.file.originalname,
          result:
            analysis,
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

      return res.status(200).json({
        success: true,
        analysis,
        remainingCredits:
          user.credits - 2,
      });

    } catch (error) {

      console.error(
        "Resume Analyzer Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

};

module.exports = {
  analyzeResume,
};