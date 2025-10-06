import axios from "axios";
import { getToken, clearAuth } from "../context/authStorage";

// Update to match your actual .NET API port (default is 5195)
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5195";

const instance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" }
});

// attach token
instance.interceptors.request.use(cfg => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default instance;
