import axios from "axios";

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: 
    "https://salestrack-pro.onrender.com/api",
    // import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  
  headers: {
    "Content-Type": "application/json",
  },
})

export default instance;
