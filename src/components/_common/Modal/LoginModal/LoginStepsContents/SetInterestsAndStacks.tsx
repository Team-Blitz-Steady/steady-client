import { loginTextStyles } from "./SetNickname";

const SetInterestsAndStacks = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      <div className="flex flex-col items-center justify-evenly gap-10">
        <div className={`${loginTextStyles} w-5/6 text-center`}>
          회원님의 <span className="text-st-primary">관심 분야</span> 및{" "}
          <span className="text-st-primary">기술 스택</span>을 알려주세요!
        </div>
      </div>
    </div>
  );
};

export default SetInterestsAndStacks;
