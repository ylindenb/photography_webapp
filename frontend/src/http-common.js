import axios from "axios";

export default axios.create({
  baseURL: process.env.APPLICATION_URL,
  headers: {
    "Content-type": "application/json"
  }
});
