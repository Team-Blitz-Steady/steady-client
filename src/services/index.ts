import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { getCookie } from "cookies-next";

// TODO: 환경변수 처리
const BASE_URL = "https://dev.steadies.kr";

const config: AxiosRequestConfig = { baseURL: BASE_URL };
export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(async (config) => {
  let access_token = null;
  if (typeof window !== "undefined") {
    access_token = getCookie("access_token");
  } else {
    const { cookies } = await import("next/headers");
    access_token = cookies().get("access_token");
  }
  console.log("access_token은!!", access_token);
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});
