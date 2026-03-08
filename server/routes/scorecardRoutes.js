const express = require("express");

const router = express.Router();

const { getScorecard } = require("../controllers/scorecardController");

router.get("/:matchId", getScorecard);

module.exports = router;