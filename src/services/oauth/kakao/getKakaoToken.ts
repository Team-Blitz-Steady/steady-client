import { axiosInstance } from "@/services";
import type { AxiosResponse } from "axios";
import type { KakaoTokenType } from "@/services/types";

const getKakaoToken = async (code: string): Promise<KakaoTokenType> => {
  try {
    const response: AxiosResponse<KakaoTokenType> = await baseInstance.get(
      `/api/v1/auth/kakao/callback?code=${code}`,
    );

    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch kakao token!");
    }

    return response.data;
  } catch (error) {
    // TODO: 에러 처리 로직 추가
    console.error(error);
    throw error;
  }
};

export default getKakaoToken;
