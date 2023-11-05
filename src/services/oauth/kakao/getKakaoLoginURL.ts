const getKakaoLoginUrl = async () => {
  try {
    const res = await fetch("https://dev.steadies.kr/api/v1/auth/kakao", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch kakao url!");
    }
    return res.headers.get("Location");
  } catch (error) {
    console.error(error);
  }
};

export default getKakaoLoginUrl;
