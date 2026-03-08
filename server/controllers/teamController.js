const Team = require("../models/Team");
const User = require("../models/User");


// CREATE TEAM
exports.createTeam = async (req, res) => {
  try {

    const { name } = req.body;

    const existingTeam = await Team.findOne({ name });

    if (existingTeam) {
      return res.status(400).json({ message: "Team already exists" });
    }

    const team = await Team.create({
      name,
      captain: req.user._id,
      players: [req.user._id]
    });

    res.status(201).json(team);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// JOIN TEAM
exports.joinTeam = async (req, res) => {
  try {

    const { teamId } = req.body;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // check if user already in ANY team
    const existingTeam = await Team.findOne({
      players: req.user._id
    });

    if (existingTeam) {
      return res.status(400).json({
        message: "You are already in a team"
      });
    }

    team.players.push(req.user._id);

    await team.save();

    res.json(team);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET ALL TEAMS
exports.getTeams = async (req, res) => {
  try {

    const teams = await Team.find()
      .populate("captain", "name email")
      .populate("players", "_id name email");

    res.json(teams);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET SINGLE TEAM DETAILS
exports.getTeam = async (req, res) => {
  try {

    const team = await Team.findById(req.params.id)
      .populate("captain", "name email")
      .populate("players", "name email");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json(team);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};