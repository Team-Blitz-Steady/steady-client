"use client";

import { type PropsWithChildren, type ReactNode } from "react";
import useLoginStepsStore from "@/stores/loginSteps";
import { AlertDialog } from "@radix-ui/themes";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import LoginStepsContainer from "./LoginStepsContainer";

const LoginModal = ({ trigger }: PropsWithChildren<{ trigger: ReactNode }>) => {
  const { steps, setIncreaseSteps, setDecreaseSteps } = useLoginStepsStore();

  const handleClickPrev = () => {
    if (steps > 0) {
      setDecreaseSteps();
    }
  };

  const handleClickNext = () => {
    if (steps < 5) {
      setIncreaseSteps();
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content className="flex h-700 w-650 items-center justify-center rounded-20 bg-st-primary max-mobile:h-3/4 max-mobile:w-screen max-mobile:p-10">
        <div className="flex h-full w-full flex-col items-center justify-between rounded-20 bg-st-white p-20">
          <div
            className={`flex w-full ${
              steps === 0 ? "justify-end" : "justify-between"
            }`}
          >
            {steps !== 0 && (
              <button
                className="h-fit w-fit"
                onClick={handleClickPrev}
              >
                <Icon
                  name="chevron-left"
                  size={20}
                  color="text-black"
                />
              </button>
            )}
            <AlertDialog.Cancel>
              <button className="h-fit w-fit">
                <Icon
                  name="cross"
                  size={20}
                  color="text-black"
                />
              </button>
            </AlertDialog.Cancel>
          </div>
          <LoginStepsContainer />
          {steps > 0 && steps < 5 ? (
            <Button
              className={`${buttonSize.md} bg-st-primary text-st-white `}
              onClick={handleClickNext}
            >
              다음
            </Button>
          ) : (
            steps === 5 && (
              <AlertDialog.Action>
                <Button
                  className={`${buttonSize.md} bg-st-primary text-st-white `}
                  onClick={handleClickNext}
                >
                  시작하기
                </Button>
              </AlertDialog.Action>
            )
          )}
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default LoginModal;
