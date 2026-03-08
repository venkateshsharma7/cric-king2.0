import { useEffect, useState } from "react";
import API from "../api/api";

function Dashboard() {

  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {

    try {

      const teamRes = await API.get("/teams");
      const matchRes = await API.get("/matches/public");
      const groundRes = await API.get("/grounds");

      setTeams(teamRes.data);
      setMatches(matchRes.data);
      setGrounds(groundRes.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  const liveMatches = matches.filter(m => m.status === "live");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-10">
        🏏 CricKing Dashboard
      </h1>

      {/* Stats Cards */}

      <div className="grid md:grid-cols-4 gap-6 mb-12">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 font-semibold">Teams</h2>
          <p className="text-4xl font-bold mt-2">{teams.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 font-semibold">Matches</h2>
          <p className="text-4xl font-bold mt-2">{matches.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 font-semibold">Grounds</h2>
          <p className="text-4xl font-bold mt-2">{grounds.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 font-semibold">Live Matches</h2>
          <p className="text-4xl font-bold text-red-600 mt-2">
            {liveMatches.length}
          </p>
        </div>

      </div>

      {/* Recent Matches */}

      <div className="bg-white p-6 rounded-lg shadow">

        <h2 className="text-xl font-bold mb-4">
          Recent Matches
        </h2>

        {matches.length === 0 ? (

          <p className="text-gray-500">No matches yet</p>

        ) : (

          <div className="space-y-3">

            {matches.slice(0,5).map(match => (

              <div
                key={match._id}
                className="flex justify-between border-b pb-2"
              >

                <span>
                  {match.teamA?.name} vs {match.teamB?.name}
                </span>

                <span
                  className={`text-sm px-2 py-1 rounded ${
                    match.status === "live"
                      ? "bg-red-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {match.status || "scheduled"}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default Dashboard;