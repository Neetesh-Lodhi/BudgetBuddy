import axios from "axios";

const API = axios.create({
  baseURL: "https://inventorybuddy.onrender.com/api",
});

// Attach JWT token properly
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
