const mongoose = require("mongoose");

const bowlerSchema = new mongoose.Schema({

  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match"
  },

  playerName: String,

  overs: {
    type: Number,
    default: 0
  },

  runs: {
    type: Number,
    default: 0
  },

  wickets: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model("Bowler", bowlerSchema);