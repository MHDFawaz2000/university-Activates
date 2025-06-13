import axios from "axios";

export const useAxiosInstance = () => {
  const baseURL = import.meta.env.VITE_SERVER_URL;

  const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true, // Optional, useful if using cookies
  });

  // ⬅️ Request interceptor to add Authorization token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ⬅️ Response interceptor for handling errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return instance;
};
