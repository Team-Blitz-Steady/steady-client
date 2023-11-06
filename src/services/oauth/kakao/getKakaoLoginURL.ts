import axios from "axios";

const getKakaoLoginUrl = async () => {
  try {
    const response = await axios.get(
      "https://dev.steadies.kr/api/v1/auth/kakao",
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch kakao url!");
    }
    return response.headers.location;
  } catch (error) {
    console.error(error);
  }
};

export default getKakaoLoginUrl;
