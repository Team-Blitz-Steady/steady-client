import { axiosInstance } from "@/services";
import type { AxiosResponse } from "axios";

interface TokenDataType {
  id: number;
  isNew: boolean;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

const getKakaoToken = async (code: string): Promise<TokenDataType> => {
  try {
    const response: AxiosResponse<TokenDataType> = await axiosInstance.get(
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
