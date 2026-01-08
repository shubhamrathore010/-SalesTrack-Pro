import axios from "axios";

const instance = axios.create({
  baseURL: 
    "https://salestrack-pro.onrender.com/api",
    // import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  
  headers: {
    "Content-Type": "application/json",
  },
})

// Attach token automatically

instance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => Promise.reject(error))

export default instance;
