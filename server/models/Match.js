const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
{
  teamA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true
  },

  teamB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true
  },

  venue: {
    type: String,
    required: true
  },

  matchDate: {
    type: Date,
    required: true
  },

  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public"
  },

  status: {
    type: String,
    enum: ["scheduled", "live", "completed"],
    default: "scheduled"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);