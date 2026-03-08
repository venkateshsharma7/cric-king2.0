const mongoose = require("mongoose");

const batsmanSchema = new mongoose.Schema({

  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match"
  },

  playerName: String,

  runs: {
    type: Number,
    default: 0
  },

  balls: {
    type: Number,
    default: 0
  },

  fours: {
    type: Number,
    default: 0
  },

  sixes: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model("Batsman", batsmanSchema);