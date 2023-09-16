import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8001/", // Replace with your API base URL
    withCredentials: true
  });
  
export default api;