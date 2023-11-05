"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import KaKaoLoginButton from "@/images/kakaobutton.png";
import SteadyText from "@/images/steadytext.png";
import SteadyTurtleIcon from "@/images/steadyturtle.png";

// TODO: use client 뺄 수 있으면 빼기

const SocialLoginStart = () => {
  // TODO: 백엔드에서 redirect uri 받기
  const handleClickKaKaoSocialLogin = () => {
    redirect(
      `https://kauth.kakao.com/oauth/authorize?client_id=b43ec3ba4cc2a54d31c6c1f7315c142b&redirect_uri=https://steady-client.vercel.app/&response_type=code`,
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center py-20">
      <div className="max-mobile:w-1/2 flex h-auto w-full flex-col items-center justify-center">
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
