import Image from "next/image";
import KaKaoLoginButton from "@/images/kakaobutton.png";
import Logo from "@/images/logo.svg";
import TextLogo from "@/images/logoText.svg";
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
      <div className="max-mobile:w-1/2 flex h-auto w-full flex-col items-center justify-center gap-20">
        <Image
          src={Logo}
          alt="소셜 로그인 스테디 로고"
          width={200}
          height={200}
        />
        <Image
          src={TextLogo}
          alt="소셜 로그인 스테디 텍스트"
          width={200}
          height={50}
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
