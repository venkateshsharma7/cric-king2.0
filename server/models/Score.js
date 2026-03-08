const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({

  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true
  },

  runs: {
    type: Number,
    default: 0
  },

  wickets: {
    type: Number,
    default: 0
  },

  overs: {
    type: Number,
    default: 0
  },

  balls: {
    type: Number,
    default: 0
  },

  battingTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },

  bowlingTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },

  history: [
    {
      type: String
    }
  ]

},
{ timestamps: true });

module.exports = mongoose.model("Score", scoreSchema);