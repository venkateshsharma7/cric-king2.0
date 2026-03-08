import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">

      <h1 className="text-5xl font-bold mb-6">
        🏏 CricKing
      </h1>

      <p className="text-gray-300 mb-8 text-center max-w-xl">
        Real-time cricket scoring platform where players can create teams,
        organize matches, book grounds and track live scores.
      </p>

      <div className="flex gap-4">

        <Link
          to="/login"
          className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-green-600 px-6 py-3 rounded hover:bg-green-700"
        >
          Register
        </Link>

      </div>

    </div>

  );

}

export default Home;