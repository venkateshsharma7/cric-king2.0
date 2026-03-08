import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      console.log("Login response:", res.data);

      // store JWT token
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      // redirect to dashboard
      navigate("/dashboard");

    } catch (err) {

      console.log(err.response?.data);

      alert(
        err.response?.data?.message ||
        "Login failed. Check email/password."
      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">
          CricKing Login
        </h1>

        <input
          className="border p-2 rounded w-full mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full mb-6"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          onClick={login}
        >
          Login
        </button>

      </div>

    </div>

  );

}

export default Login;
