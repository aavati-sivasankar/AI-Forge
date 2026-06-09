const express =
  require("express");

const upload =
  require("../middleware/upload");

const {
  summarizePDFController,
} = require(
  "../controllers/pdf.controller"
);

const router =
  express.Router();

router.post(
  "/summarize",
  upload.single("pdf"),
  summarizePDFController
);

module.exports =
  router;