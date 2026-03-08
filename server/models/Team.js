const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    unique: true
  },

  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  matchesPlayed: {
    type: Number,
    default: 0
  },

  wins: {
    type: Number,
    default: 0
  },

  losses: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    default: 0
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);