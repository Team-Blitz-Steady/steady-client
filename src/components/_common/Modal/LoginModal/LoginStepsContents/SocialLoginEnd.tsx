import Image from "next/image";
import Logo from "@/images/logo.svg";
import TextLogo from "@/images/logoText.svg";
import { loginTextStyles } from "./SetNickname";

const SocialLoginEnd = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      <div className="max-mobile:w-1/2 flex h-auto w-full flex-col items-center justify-between gap-10">
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
      <div className={`${loginTextStyles} gap-30 text-center`}>
        이제 <span className="text-st-primary">{'"스테디"'}</span> 를
        <div>시작하러 떠나볼까요?</div>
      </div>
    </div>
  );
};

export default SocialLoginEnd;
