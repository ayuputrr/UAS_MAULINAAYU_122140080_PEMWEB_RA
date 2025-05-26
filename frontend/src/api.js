import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6543",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
