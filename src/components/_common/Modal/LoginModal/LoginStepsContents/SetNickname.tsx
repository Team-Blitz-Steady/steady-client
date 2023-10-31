import Input from "@/components/_common/Input";

export const loginTextStyles = "text-26 font-bold max-mobile:text-20";

const SetNickname = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      <div className="flex flex-col items-center justify-evenly gap-10">
        <div className={loginTextStyles}>
          <span className="text-st-primary">스테디</span>에 오신 걸 환영합니다!
        </div>
        <div className={loginTextStyles}>닉네임을 설정해주세요</div>
      </div>
      {/* TODO: data 받기, react-hook-form or zod 사용, 유효성 검사 */}
      <Input inputName="name-input" />
    </div>
  );
};

export default SetNickname;
