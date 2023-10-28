import { LOGIN_TEXT } from "./SetNickname";

const SteadyDescriptionStart = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      <div className="flex flex-col items-center justify-evenly gap-10">
        <div
          className={`${LOGIN_TEXT} leading-1000 w-5/6 text-center max-mobile:w-auto`}
        >
          <span className="text-st-primary">{'"스테디"'}</span> 는
          <div>스터디와 프로젝트를</div>
          <div> 모두 포함하는 용어입니다 !</div>
        </div>
      </div>
    </div>
  );
};

export default SteadyDescriptionStart;
