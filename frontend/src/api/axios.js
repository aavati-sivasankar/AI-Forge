import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

console.log(
  "AXIOS BASE URL:",
  API.defaults.baseURL
);

export default API;