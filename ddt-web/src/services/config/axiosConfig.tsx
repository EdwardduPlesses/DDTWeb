import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: import.meta.env.VITE_DDT_API,
  timeout: 5000,
  withCredentials: true,
});

// defining a custom error handler for all APIs
const errorHandler = (error: AxiosError) => {
  const statusCode = error.response?.status;

  if (error.code === "ERR_CANCELED") {
    //Snacbar
    return Promise.resolve();
  }

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  if (error && (error as AxiosError).response) {
    return Promise.reject((error as AxiosError).response);
  }
  if (error && (error as AxiosError).status === 401) {
    return Promise.reject(
      new Error("You are not authorized to view this page")
    );
  }
  return Promise.reject(
    new Error("An error occurred during login Leaderboard Fetch")
  );
};

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("_auth");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
