const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTeam,
  joinTeam,
  getTeam,
  getTeams
} = require("../controllers/teamController");

router.post("/create", protect, createTeam);
router.post("/join", protect, joinTeam);
router.get("/", getTeams);
router.get("/:id", getTeam);

module.exports = router;