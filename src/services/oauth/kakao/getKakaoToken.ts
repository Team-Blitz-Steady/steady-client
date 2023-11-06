import { baseInstance } from "@/services";

const getKakaoToken = async (code: string) => {
  try {
    const response = await baseInstance.get(
      `/api/v1/auth/kakao/callback?code=${code}`,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch kakao token!");
    }
    return response.data;
  } catch (error) {
    // TODO: error handling 로직 추가하기
    console.error(error);
  }
};

export default getKakaoToken;
