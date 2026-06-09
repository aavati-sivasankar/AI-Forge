const express = require("express");

const {
  getHistory,
  clearHistory,
} = require("../controllers/history.controller");

const router = express.Router();

router.get(
  "/",
  getHistory
);

router.delete(
  "/clear",
  clearHistory
);

module.exports = router;