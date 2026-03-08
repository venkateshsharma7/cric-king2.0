const mongoose = require("mongoose");

const groundSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  pricePerHour: {
    type: Number,
    required: true
  },

  amenities: {
    type: [String],
    default: []
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Ground", groundSchema);