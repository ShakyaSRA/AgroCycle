import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  withXSRFToken: true,
});

export function ensureCsrfCookie() {
  return axios.get(`${API_URL}/sanctum/csrf-cookie`, { withCredentials: true });
}

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default client;
