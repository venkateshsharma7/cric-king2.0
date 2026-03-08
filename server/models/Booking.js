const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
{
  ground: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ground",
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  startTime: {
    type: String,
    required: true
  },

  endTime: {
    type: String,
    required: true
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);