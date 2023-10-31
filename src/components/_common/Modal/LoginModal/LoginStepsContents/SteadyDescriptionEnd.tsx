import { loginTextStyles } from "./SetNickname";

const SteadyDescriptionEnd = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      <div className="flex flex-col items-center justify-evenly gap-10">
        <div className={`${loginTextStyles} leading-1000 w-5/6 text-center`}>
          <span className="text-st-primary">스테디</span> 참여를 위해
          <div>리더가 설정한 신청서를 작성해 보세요!</div>
        </div>
      </div>
    </div>
  );
};

export default SteadyDescriptionEnd;
