import Image from "next/image";
import SteadyText from "@/images/steadytext.png";
import SteadyTurtleIcon from "@/images/steadyturtle.png";
import { loginTextStyles } from "./SetNickname";

const SocialLoginEnd = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      <div className="max-mobile:w-1/2 flex h-auto w-full flex-col items-center justify-between">
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
      <div className={`${loginTextStyles} gap-30 text-center`}>
        이제 <span className="text-st-primary">{'"스테디"'}</span> 를
        <div>시작하러 떠나볼까요?</div>
      </div>
    </div>
  );
};

export default SocialLoginEnd;
