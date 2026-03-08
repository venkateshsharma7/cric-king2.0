import { useState, useEffect } from "react";
import API from "../api/api";

function Teams() {

  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([]);

  // CREATE TEAM
  const createTeam = async () => {
    try {

      if (!teamName) {
        alert("Enter team name");
        return;
      }

      const res = await API.post("/teams/create", {
        name: teamName
      });

      alert("Team created successfully");

      setTeams([...teams, res.data]);
      setTeamName("");

    } catch (err) {

      console.log(err.response);
      alert(err.response?.data?.message || "Error creating team");

    }
  };

  // JOIN TEAM
  const joinTeam = async (teamId) => {
    try {

      await API.post("/teams/join", {
        teamId
      });

      alert("Joined team successfully");

    } catch (err) {

      console.log(err.response);
      alert(err.response?.data?.message || "Error joining team");

    }
  };

  // FETCH TEAMS
  const fetchTeams = async () => {
    try {

      const res = await API.get("/teams");
      setTeams(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        🏏 Teams
      </h1>

      {/* Create Team */}

      <div className="bg-white p-6 rounded-lg shadow w-fit mb-10">

        <h2 className="text-xl font-bold mb-4">
          Create Team
        </h2>

        <input
          className="border p-2 rounded mb-4 w-full"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={createTeam}
        >
          Create Team
        </button>

      </div>

      {/* Teams List */}

      <h2 className="text-xl font-bold mb-6">
        Available Teams
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {teams.map((team) => (

          <div
            key={team._id}
            className="bg-white p-6 rounded-lg shadow"
          >

            <h3 className="text-lg font-bold mb-3">
              {team.name}
            </h3>

            <p className="text-gray-500 mb-4">
              Players: {team.players?.length || 0}
            </p>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => joinTeam(team._id)}
            >
              Join Team
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Teams;