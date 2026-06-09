const express = require("express");
const { requireAuth } = require("@clerk/express");

const router = express.Router();

const {
  createArticle,
} = require("../controllers/article.controller");

router.post(
  "/generate",
  createArticle
);

module.exports = router;