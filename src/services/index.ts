import type { AxiosRequestConfig } from "axios";
import axios from "axios";

const BASE_URL = "https://dev.steadies.kr";

const axiosApi = (url: string, options?: AxiosRequestConfig) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

// const axiosAuthApi = (url: string, options?: AxiosRequestConfig) => {
//   const token = "토큰 값";
//   const instance = axios.create({
//     baseURL: url,
//     headers: { Authorization: "Bearer " + token },
//     ...options,
//   });
//   return instance;
// };

export const baseInstance = axiosApi(BASE_URL);
// export const authInstance = axiosAuthApi(BASE_URL)
