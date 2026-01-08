import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("Authentication");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    
    // Avoid showing toasts for 401s if they are just redirects
    if (error.response?.status !== 401) {
        toast.error(message);
    }
    
    return Promise.reject(error);
  }
);
