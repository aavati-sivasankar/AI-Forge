const express =
  require("express");

const upload =
  require("../middleware/upload");

const {
  removeBackgroundController,
} = require(
  "../controllers/background.controller"
);

const router =
  express.Router();

router.post(
  "/remove",
  upload.single("image"),
  removeBackgroundController
);

module.exports =
  router;