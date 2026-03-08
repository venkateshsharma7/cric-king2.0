const Batsman = require("../models/Batsman");
const Bowler = require("../models/Bowler");

exports.getScorecard = async (req, res) => {

  try {

    const matchId = req.params.matchId;

    const batsmen = await Batsman.find({ match: matchId });

    const bowlers = await Bowler.find({ match: matchId });

    res.json({
      batsmen,
      bowlers
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};