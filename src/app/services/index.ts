import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dev.steadies.kr",
});

export default axiosInstance;
