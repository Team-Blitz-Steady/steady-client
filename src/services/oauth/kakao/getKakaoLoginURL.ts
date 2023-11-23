import { axiosInstance, isAbnormalCode } from "@/services";
import type { AxiosResponse } from "axios";

const getKakaoLoginUrl = async (): Promise<string> => {
  try {
    const response: AxiosResponse<string> =
      await axiosInstance.get("/api/v1/auth/kakao");
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch kakao url!");
    }
    return response.headers.location;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getKakaoLoginUrl;
