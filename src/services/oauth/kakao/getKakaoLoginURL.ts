import { baseInstance } from "@/services";

const getKakaoLoginUrl = async () => {
  try {
    const response = await baseInstance.get("/api/v1/auth/kakao");
    if (response.status / 10 !== 20) {
      throw new Error("Failed to fetch kakao url!");
    }
    return response.headers.location;
  } catch (error) {
    console.error(error);
  }
};

export default getKakaoLoginUrl;
