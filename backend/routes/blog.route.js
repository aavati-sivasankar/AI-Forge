const express =
  require("express");

const {
  createBlogTitles,
} = require(
  "../controllers/blog.controller"
);

const router =
  express.Router();

router.post(
  "/generate",
  createBlogTitles
);

module.exports = router;