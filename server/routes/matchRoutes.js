const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { startMatch } = require("../controllers/matchController");

const {
  createMatch,
  getMatch,
  getPublicMatches
} = require("../controllers/matchController");


router.post("/create", protect, createMatch);
router.get("/public", getPublicMatches);
router.get("/:id", protect, getMatch);
router.patch("/start/:id", startMatch);

module.exports = router;