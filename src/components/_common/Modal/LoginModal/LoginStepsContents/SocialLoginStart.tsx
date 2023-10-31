"use client";

import Image from "next/image";
import KaKaoLoginButton from "@/images/kakaobutton.png";
import SteadyText from "@/images/steadytext.png";
import SteadyTurtleIcon from "@/images/steadyturtle.png";

// TODO: use client 뺄 수 있으면 빼기

const REST_API_KEY = "3ed0efd25050442006de34536e7e8b80";
const REDIRECT_URI = "http://localhost:3000";

const SocialLoginStart = () => {
  // TODO: 백엔드에서 redirect uri 받기
  const handleClickKaKaoSocialLogin = () => {
    const x = 500;
    const y = 700;
    const xPos = window.screen.width / 2 - x / 2; // 가운데 정렬
    const yPos = window.screen.height / 2 - y / 2;
    window.open(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
      "스테디 카카오 소셜 로그인",
      `width=${x},height=${y}" left=${xPos} top=${yPos}`,
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center py-20">
      <div className="flex h-auto w-full flex-col items-center justify-center max-mobile:w-1/2">
        <Image
          src={SteadyTurtleIcon}
          alt="소셜 로그인 스테디 로고"
          width={0}
          height={0}
          sizes="100vw"
        />
        <Image
          src={SteadyText}
          alt="소셜 로그인 스테디 텍스트"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div
        className="m-auto"
        onClick={handleClickKaKaoSocialLogin}
      >
        <Image
          src={KaKaoLoginButton}
          alt="카카오 소셜 로그인 버튼"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SocialLoginStart;
