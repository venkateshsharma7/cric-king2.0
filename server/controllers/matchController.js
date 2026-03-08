const Match = require("../models/Match");

// CREATE MATCH
exports.createMatch = async (req, res) => {
  try {

    const { teamA, teamB, venue, matchDate, visibility } = req.body;

    let accessCode = null;

    // If match is private, generate access code
    if (visibility === "private") {
      accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    const match = await Match.create({
      teamA,
      teamB,
      venue,
      matchDate,
      visibility,
      accessCode
    });

    res.status(201).json(match);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET MATCH DETAILS
exports.getMatch = async (req, res) => {
  try {

    const match = await Match.findById(req.params.id)
      .populate("teamA")
      .populate("teamB");

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.json(match);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET ALL PUBLIC MATCHES
exports.getPublicMatches = async (req, res) => {
  try {

    const matches = await Match.find({ visibility: "public" })
      .populate("teamA", "name")
      .populate("teamB", "name");

    res.json(matches);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.startMatch = async (req, res) => {

  try {

    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    match.status = "live";

    await match.save();

    res.json(match);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};