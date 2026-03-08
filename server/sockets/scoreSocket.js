const Score = require("../models/Score");
const Batsman = require("../models/Batsman");
const Bowler = require("../models/Bowler");

module.exports = (io) => {

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // JOIN MATCH
    socket.on("joinMatch", async (matchId) => {

      socket.join(matchId);

      const score = await Score.findOne({ match: matchId });

      if (score) {
        socket.emit("scoreUpdated", score);
      }

    });


    // UPDATE SCORE
    socket.on("updateScore", async (data) => {

      console.log("Score Update:", data);

      const {
        matchId,
        striker,
        nonStriker,
        bowler,
        runs,
        wickets,
        overs,
        balls,
        ball
      } = data;

      let score = await Score.findOne({ match: matchId });

      if (!score) {

        score = await Score.create({
          match: matchId,
          runs,
          wickets,
          overs,
          balls,
          history: []
        });

      } else {

        score.runs = runs;
        score.wickets = wickets;
        score.overs = overs;
        score.balls = balls;

      }

      // BALL HISTORY
      if (ball) {
        score.history.push(ball);
      }

      await score.save();


      // =================
// UPDATE BATSMAN
// =================

if (striker) {

  let strikerDoc = await Batsman.findOne({
    match: matchId,
    playerName: striker
  });

  if (!strikerDoc) {

    strikerDoc = await Batsman.create({
      match: matchId,
      playerName: striker,
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0
    });

  }

  strikerDoc.balls += 1;

  if (ball === "1") strikerDoc.runs += 1;

  if (ball === "4") {
    strikerDoc.runs += 4;
    strikerDoc.fours += 1;
  }

  if (ball === "6") {
    strikerDoc.runs += 6;
    strikerDoc.sixes += 1;
  }

  await strikerDoc.save();

}


// create non-striker if not exists
if (nonStriker) {

  let nonStrikerDoc = await Batsman.findOne({
    match: matchId,
    playerName: nonStriker
  });

  if (!nonStrikerDoc) {

    await Batsman.create({
      match: matchId,
      playerName: nonStriker,
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0
    });

  }

}


      // =================
      // UPDATE BOWLER
      // =================

      if (bowler) {

        let bowlerDoc = await Bowler.findOne({
          match: matchId,
          playerName: bowler
        });

        if (!bowlerDoc) {

          bowlerDoc = await Bowler.create({
            match: matchId,
            playerName: bowler,
            overs: 0,
            runs: 0,
            wickets: 0
          });

        }

        if (ball === "W") {
          bowlerDoc.wickets += 1;
        }

        if (!isNaN(parseInt(ball))) {
          bowlerDoc.runs += parseInt(ball);
        }

        await bowlerDoc.save();

      }


      // SEND UPDATE
      io.to(matchId).emit("scoreUpdated", score);

    });

  });

};