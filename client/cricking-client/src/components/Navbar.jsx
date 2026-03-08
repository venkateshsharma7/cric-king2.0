import { Link } from "react-router-dom";

function Navbar() {

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (

    <div className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">

      {/* Logo */}

      <Link
        to="/"
        className="text-xl font-bold hover:text-green-400"
      >
        🏏 CricKing
      </Link>

      {/* Navigation */}

      <div className="flex items-center gap-6 text-gray-300">

        <Link to="/" className="hover:text-white">
          Home
        </Link>

        <Link to="/dashboard" className="hover:text-white">
          Dashboard
        </Link>

        <Link to="/teams" className="hover:text-white">
          Teams
        </Link>

        <Link to="/matches" className="hover:text-white">
          Matches
        </Link>

        <Link to="/grounds" className="hover:text-white">
          Grounds
        </Link>

        {!token ? (

          <>
            <Link
              to="/login"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>

        ) : (

          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>

        )}

      </div>

    </div>

  );

}

export default Navbar;