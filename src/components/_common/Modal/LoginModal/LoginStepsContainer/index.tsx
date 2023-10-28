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
  return <>{renderByLoginStep(steps)}</>;
};

export default LoginStepsContainer;
