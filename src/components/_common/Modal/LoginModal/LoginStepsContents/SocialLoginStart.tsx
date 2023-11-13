import Image from "next/image";
import KaKaoLoginButton from "@/images/kakaobutton.png";
import SteadyText from "@/images/steadytext.png";
import SteadyTurtleIcon from "@/images/steadyturtle.png";
import getKakaoLoginUrl from "@/services/oauth/kakao/getKakaoLoginURL";

const SocialLoginStart = () => {
  const handleClickKaKaoSocialLogin = () => {
    getKakaoLoginUrl().then((res) => {
      if (res.startsWith("https://kauth.kakao.com/oauth/authorize")) {
        window.location.href = res;
      }
    });
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
