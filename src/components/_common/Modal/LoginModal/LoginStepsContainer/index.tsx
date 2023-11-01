"use client";

import { Fragment } from "react";
import useLoginStepsStore from "@/stores/loginSteps";
import {
  SetInterestsAndStacks,
  SetNickname,
  SocialLoginEnd,
  SocialLoginStart,
  SteadyDescriptionEnd,
  SteadyDescriptionStart,
} from "../LoginStepsContents";

// TODO: 1~5에서 로그인 했는지 검사 필요 안했으면 0으로 보내기 -> 훅으로 만들어서 각각 쓰기~
const LoginStepsContainer = () => {
  const { steps } = useLoginStepsStore();
  const renderByLoginStep = (steps: number) => {
    switch (steps) {
      case 0:
        return <SocialLoginStart />;
      case 1:
        return <SetNickname />;
      case 2:
        return <SetInterestsAndStacks />;
      case 3:
        return <SteadyDescriptionStart />;
      case 4:
        return <SteadyDescriptionEnd />;
      case 5:
        return <SocialLoginEnd />;
      default:
        return <Fragment />;
    }
  };
  // <LoginValidaton></LoginValidaton>
  return <>{renderByLoginStep(steps)}</>;
};

export default LoginStepsContainer;
