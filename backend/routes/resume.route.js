const express =
  require("express");

const upload =
  require("../middleware/upload");

const {
  analyzeResume,
} = require(
  "../controllers/resume.controller"
);

const router =
  express.Router();

router.post(
  "/analyze",
  upload.single("resume"),
  analyzeResume
);

module.exports = router;