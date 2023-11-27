import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { cookieService } from "@/utils/cookieService";

// TODO: 환경변수 처리
const BASE_URL = "https://dev.steadies.kr";

export const isAbnormalCode = (code: number) => {
  return Math.floor(code / 10) !== 20;
};

const config: AxiosRequestConfig = { baseURL: BASE_URL, timeout: 5000 };
export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(async (config) => {
  const access_token = await cookieService.get("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});
