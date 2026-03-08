import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

function Scorecard() {

  const { matchId } = useParams();

  const [batsmen, setBatsmen] = useState([]);
  const [bowlers, setBowlers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchScorecard = async () => {

      try {

        const res = await API.get(`/scorecard/${matchId}`);

        setBatsmen(res.data.batsmen || []);
        setBowlers(res.data.bowlers || []);

      } catch (err) {

        console.log("Scorecard fetch error:", err);

      } finally {

        setLoading(false);

      }

    };

    fetchScorecard();

  }, [matchId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading Scorecard...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        🏏 Match Scorecard
      </h1>

      {/* Batting Table */}

      <div className="mb-12">

        <h2 className="text-2xl font-bold mb-4">
          Batting
        </h2>

        <div className="bg-gray-800 rounded-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-700 text-gray-300">

              <tr>
                <th className="p-3 text-left">Batsman</th>
                <th className="p-3">R</th>
                <th className="p-3">B</th>
                <th className="p-3">4s</th>
                <th className="p-3">6s</th>
                <th className="p-3">SR</th>
              </tr>

            </thead>

            <tbody>

              {batsmen.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-400">
                    No batting data
                  </td>
                </tr>
              )}

              {batsmen.map((player) => {

                const strikeRate =
                  player.balls > 0
                    ? ((player.runs / player.balls) * 100).toFixed(2)
                    : "0.00";

                return (

                  <tr
                    key={player._id}
                    className="border-t border-gray-700"
                  >

                    <td className="p-3 font-semibold">
                      {player.playerName}
                    </td>

                    <td className="text-center">
                      {player.runs}
                    </td>

                    <td className="text-center">
                      {player.balls}
                    </td>

                    <td className="text-center">
                      {player.fours}
                    </td>

                    <td className="text-center">
                      {player.sixes}
                    </td>

                    <td className="text-center">
                      {strikeRate}
                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      </div>

      {/* Bowling Table */}

      <div>

        <h2 className="text-2xl font-bold mb-4">
          Bowling
        </h2>

        <div className="bg-gray-800 rounded-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-700 text-gray-300">

              <tr>
                <th className="p-3 text-left">Bowler</th>
                <th className="p-3">Runs</th>
                <th className="p-3">Wickets</th>
                <th className="p-3">Economy</th>
              </tr>

            </thead>

            <tbody>

              {bowlers.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-400">
                    No bowling data
                  </td>
                </tr>
              )}

              {bowlers.map((bowler) => {

                const economy =
                  bowler.overs > 0
                    ? (bowler.runs / bowler.overs).toFixed(2)
                    : "0.00";

                return (

                  <tr
                    key={bowler._id}
                    className="border-t border-gray-700"
                  >

                    <td className="p-3 font-semibold">
                      {bowler.playerName}
                    </td>

                    <td className="text-center">
                      {bowler.runs}
                    </td>

                    <td className="text-center">
                      {bowler.wickets}
                    </td>

                    <td className="text-center">
                      {economy}
                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Scorecard;