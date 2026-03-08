import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Matches from "./pages/Matches";
import Grounds from "./pages/Grounds";
import LiveScore from "./pages/LiveScore";
import Scorecard from "./pages/Scorecard";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/teams" element={<Teams />} />

        <Route path="/matches" element={<Matches />} />

        <Route path="/grounds" element={<Grounds />} />

        <Route path="/live/:matchId" element={<LiveScore />} />

        <Route path="/scorecard/:matchId" element={<Scorecard />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;