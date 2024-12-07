import axios from "axios";

// Create an Axios instance with the base URL of the backend server
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Replace with your backend server's URL if different
});

export default axiosInstance;
