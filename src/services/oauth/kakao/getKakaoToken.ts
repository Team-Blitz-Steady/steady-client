import { baseInstance } from "@/services";
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
    const response: AxiosResponse<TokenDataType> = await baseInstance.get(
      `/api/v1/auth/kakao/callback?code=${code}`,
    );

    if (response.status !== 201) {
      throw new Error("Failed to fetch kakao token!");
    }

    return response.data;
  } catch (error) {
    // 에러 처리 로직 추가
    console.error(error);
    throw error;
  }
};

export default getKakaoToken;
