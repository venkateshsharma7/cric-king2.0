import axios from "axios";

const API = axios.create({
  baseURL: "https://cric-king2-0.onrender.com/api",
  withCredentials: false
});

export default API;
