import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { getCookie } from "cookies-next";

// TODO: 환경변수 처리
const BASE_URL = "https://dev.steadies.kr";

const config: AxiosRequestConfig = { baseURL: BASE_URL };
export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(async (config) => {
  const access_token = getCookie("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});
