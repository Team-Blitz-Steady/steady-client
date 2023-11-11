import useLoginStepsStore from "@/stores/loginSteps";
import Button, { buttonSize } from "@/components/_common/Button";
import { loginTextStyles } from "./SetNickname";

const SteadyDescriptionStart = () => {
  const { setIncreaseSteps } = useLoginStepsStore();
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-evenly">
        <div
          className={`${loginTextStyles} leading-1000 max-mobile:w-auto text-center`}
        >
          <span className="text-st-primary">{'"스테디"'}</span>
          <span>는 스터디와 프로젝트를</span>
          <div> 모두 포함하는 저희 서비스 용어입니다!</div>
        </div>
      </div>
      <Button
        className={`${buttonSize.md} bg-st-primary text-st-white`}
        onClick={() => setIncreaseSteps()}
      >
        다음
      </Button>
    </>
  );
};

export default SteadyDescriptionStart;
