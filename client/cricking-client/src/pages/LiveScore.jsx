import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";

function LiveScore() {

  const { matchId } = useParams();

  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const [history, setHistory] = useState([]);

  const [striker, setStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");
  const [bowler, setBowler] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {

    socket.emit("joinMatch", matchId);

    const handleScoreUpdate = (data) => {

      setRuns(data.runs);
      setWickets(data.wickets);
      setOvers(data.overs);
      setBalls(data.balls);

      if (data.history) {
        setHistory(data.history);
      }

    };

    socket.on("scoreUpdated", handleScoreUpdate);

    return () => {
      socket.off("scoreUpdated", handleScoreUpdate);
    };

  }, [matchId]);

  const sendUpdate = (type) => {

    if (!striker) {
      alert("Enter striker name first");
      return;
    }

    let newRuns = runs;
    let newWickets = wickets;
    let newBalls = balls;
    let newOvers = overs;

    let ballEvent = "";

    if (type === "run1") {
      newRuns += 1;
      ballEvent = "1";
    }

    if (type === "four") {
      newRuns += 4;
      ballEvent = "4";
    }

    if (type === "six") {
      newRuns += 6;
      ballEvent = "6";
    }

    if (type === "dot") {
      ballEvent = ".";
    }

    if (type === "wicket") {
      newWickets += 1;
      ballEvent = "W";
    }

    newBalls++;

    if (ballEvent === "1") {
      const temp = striker;
      setStriker(nonStriker);
      setNonStriker(temp);
    }

    if (newBalls === 6) {
      newOvers++;
      newBalls = 0;

      const temp = striker;
      setStriker(nonStriker);
      setNonStriker(temp);
    }

    socket.emit("updateScore", {
      matchId,
      striker,
      nonStriker,
      bowler,
      runs: newRuns,
      wickets: newWickets,
      overs: newOvers,
      balls: newBalls,
      ball: ballEvent
    });

  };

  const totalBalls = overs * 6 + balls;

  const runRate =
    totalBalls > 0
      ? (runs / (totalBalls / 6)).toFixed(2)
      : "0.00";

  const remainingRuns = target ? target - runs : 0;
  const remainingBalls = 120 - totalBalls;

  const requiredRunRate =
    remainingBalls > 0
      ? ((remainingRuns / remainingBalls) * 6).toFixed(2)
      : "0.00";

  return (

    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        🏏 CricKing Live Match
      </h1>

      {/* Scoreboard */}

      <div className="bg-gray-800 p-6 rounded-lg w-fit mb-8 shadow-lg">

        <h2 className="text-4xl font-bold">
          {runs}/{wickets}
        </h2>

        <p className="text-gray-400 mt-1">
          Overs {overs}.{balls}
        </p>

        <div className="mt-3 flex gap-6">

          <p>
            CRR <span className="font-bold">{runRate}</span>
          </p>

          <p>
            RRR <span className="font-bold">
              {target ? requiredRunRate : "-"}
            </span>
          </p>

        </div>

      </div>

      {/* Player Inputs */}

      <div className="grid grid-cols-3 gap-4 w-[600px] mb-6">

        <input
          className="p-2 rounded bg-gray-800"
          placeholder="Striker"
          value={striker}
          onChange={(e) => setStriker(e.target.value)}
        />

        <input
          className="p-2 rounded bg-gray-800"
          placeholder="Non Striker"
          value={nonStriker}
          onChange={(e) => setNonStriker(e.target.value)}
        />

        <input
          className="p-2 rounded bg-gray-800"
          placeholder="Bowler"
          value={bowler}
          onChange={(e) => setBowler(e.target.value)}
        />

      </div>

      <input
        className="p-2 rounded bg-gray-800 mb-6"
        placeholder="Target Score"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />

      {/* Score Buttons */}

      <div className="flex gap-4 mb-10">

        <button
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          onClick={() => sendUpdate("run1")}
        >
          +1
        </button>

        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => sendUpdate("four")}
        >
          4
        </button>

        <button
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
          onClick={() => sendUpdate("six")}
        >
          6
        </button>

        <button
          className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
          onClick={() => sendUpdate("dot")}
        >
          Dot
        </button>

        <button
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          onClick={() => sendUpdate("wicket")}
        >
          Wicket
        </button>

      </div>

      {/* Ball History */}

      <h3 className="text-xl font-bold mb-3">
        Last 6 Balls
      </h3>

      <div className="flex gap-3">

        {history.slice(-6).map((ball, index) => {

          let color = "bg-gray-600";

          if (ball === "1" || ball === "2" || ball === "3") color = "bg-green-600";
          if (ball === "4") color = "bg-blue-600";
          if (ball === "6") color = "bg-purple-600";
          if (ball === "W") color = "bg-red-600";

          return (

            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white ${color}`}
            >
              {ball}
            </div>

          );

        })}

      </div>

    </div>

  );

}

export default LiveScore;