const getKakaoToken = async (code: string) => {
  try {
    const res = await fetch(
      `https://dev.steadies.kr/api/v1/auth/kakao/callback?code=${code}`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch kakao token!");
    }
    return res.json();
  } catch (error) {
    // TODO: error handling 로직 추가하기
    console.error(error);
  }
};

export default getKakaoToken;
