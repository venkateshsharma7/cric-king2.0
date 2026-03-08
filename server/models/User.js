const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["player", "groundOwner", "admin"],
        default: "player"
    },

    profilePic: {
        type: String,
        default: ""
    },

    battingStyle: {
        type: String,
        default: ""
    },

    bowlingType: {
        type: String,
        default: ""
    },

    playerRole: {
        type: String,
        enum: ["batsman", "bowler", "allrounder", "wicketkeeper"],
        default: "batsman"
    },

    rating: {
        type: Number,
        default: 0
    },

    stats: {
        matches: { type: Number, default: 0 },
        runs: { type: Number, default: 0 },
        wickets: { type: Number, default: 0 },
        strikeRate: { type: Number, default: 0 }
    }

},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);