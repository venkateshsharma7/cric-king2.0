import { useState, useEffect } from "react";
import API from "../api/api";

function Matches() {

  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [venue, setVenue] = useState("");

  // Fetch teams
  const fetchTeams = async () => {
    try {
      const res = await API.get("/teams");
      setTeams(res.data);
    } catch (err) {
      console.log("Team fetch error:", err);
    }
  };

  // Fetch matches
  const fetchMatches = async () => {
    try {
      const res = await API.get("/matches/public");
      setMatches(res.data);
    } catch (err) {
      console.log("Match fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create match
  const createMatch = async () => {

    if (!teamA || !teamB || !venue) {
      alert("Please fill all fields");
      return;
    }

    if (teamA === teamB) {
      alert("Teams must be different");
      return;
    }

    try {

      await API.post("/matches/create", {
        teamA,
        teamB,
        venue,
        matchDate: new Date(),
        visibility: "public"
      });

      alert("Match created successfully");

      setTeamA("");
      setTeamB("");
      setVenue("");

      fetchMatches();

    } catch (err) {

      console.log("MATCH ERROR:", err.response?.data);

      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error creating match"
      );

    }

  };

  const startMatch = async (matchId) => {

    try {

      await API.patch(`/matches/start/${matchId}`);

      window.location.href = `/live/${matchId}`;

    } catch (err) {

      alert("Unable to start match");

    }

  };

  useEffect(() => {
    fetchTeams();
    fetchMatches();
  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        🏏 Matches
      </h1>

      {/* Create Match */}

      <div className="bg-white p-6 rounded-lg shadow mb-10 max-w-xl">

        <h2 className="text-xl font-bold mb-4">
          Create Match
        </h2>

        <div className="flex gap-4 mb-4">

          <select
            className="border p-2 rounded w-full"
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
          >

            <option value="">Select Team A</option>

            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}

          </select>

          <select
            className="border p-2 rounded w-full"
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
          >

            <option value="">Select Team B</option>

            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}

          </select>

        </div>

        <input
          className="border p-2 rounded w-full mb-4"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          onClick={createMatch}
        >
          Create Match
        </button>

      </div>

      {/* Public Matches */}

      <h2 className="text-xl font-bold mb-6">
        Public Matches
      </h2>

      {loading ? (

        <p>Loading matches...</p>

      ) : matches.length === 0 ? (

        <p className="text-gray-500">No matches available</p>

      ) : (

        <div className="grid md:grid-cols-3 gap-6">

          {matches.map((match) => (

            <div
              key={match._id}
              className="bg-white p-6 rounded-lg shadow"
            >

              <h3 className="text-lg font-bold mb-2">

                {match.teamA?.name}
                <span className="text-gray-500"> vs </span>
                {match.teamB?.name}

              </h3>

              <p className="text-gray-500 mb-2">
                Venue: {match.venue}
              </p>

              <p className="mb-4">

                Status:

                <span
                  className={`ml-2 px-2 py-1 text-sm rounded ${
                    match.status === "live"
                      ? "bg-red-600 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {match.status || "scheduled"}
                </span>

              </p>

              {match.status === "live" ? (

                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                  onClick={() =>
                    window.location.href = `/live/${match._id}`
                  }
                >
                  View Live
                </button>

              ) : (

                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                  onClick={() => startMatch(match._id)}
                >
                  Start Match
                </button>

              )}

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Matches;