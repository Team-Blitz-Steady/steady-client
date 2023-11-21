import type { AxiosRequestConfig } from "axios";
import axios from "axios";

// TODO: 환경변수 처리
const BASE_URL = "https://dev.steadies.kr";

const config: AxiosRequestConfig = { baseURL: BASE_URL };
export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(async (config) => {
  const access_token = await cookieService.get("access_token");
  console.log("access_token은!!", access_token);
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

export const cookieService = {
  get: async (key: string) => {
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      return cookies().get(key);
    }
    const { getCookie: get_cookie } = await import("cookies-next");
    return get_cookie(key);
  },
  set: async (key: string, value: string) => {
    if (typeof window === "undefined") {
      const { cookies } = await import("next/headers");
      return cookies().set(key, value);
    }
    const { setCookie: set_cookie } = await import("cookies-next");
    return set_cookie(key, value);
  },
};

// export const getCookie = async (key: string) => {
//   if (typeof window === "undefined") {
//     const { cookies } = await import("next/headers");
//     return cookies().get(key);
//   }
//   const { getCookie: get_cookie } = await import("cookies-next");
//   return get_cookie(key);
// };
