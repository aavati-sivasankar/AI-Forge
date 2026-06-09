const express = require("express");
const { requireAuth } = require("@clerk/express");

const {
  syncUser,
} = require("../controllers/user.controller");

const router = express.Router();


router.post(
  "/sync",
  (req, res, next) => {
    console.log("SYNC ROUTE HIT");
    next();
  },
  syncUser
);

module.exports = router;