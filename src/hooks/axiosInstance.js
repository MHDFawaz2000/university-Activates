import axios from "axios";

export const useAxiosInstance = () => {
  // Use a hardcoded base URL if environment variable is not available
  const baseURL = import.meta.env.VITE_SERVER_URL;
  
  let obj = {
    baseURL: baseURL,
    withCredentials: true,
  };

  const instance = axios.create(obj);
  
  // Add interceptors for handling errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return instance;
};
