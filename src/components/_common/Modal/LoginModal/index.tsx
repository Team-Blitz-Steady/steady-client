"use client";

import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import useLoginStepsStore from "@/stores/loginSteps";
import { AlertDialog } from "@radix-ui/themes";
import getKakaoToken from "@/services/oauth/kakao/getKakaoToken";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import LoginStepsContainer from "./LoginStepsContainer";

// TODO: steps 검사 필요 (0~5)가 아닌것들...

const LoginModal = ({ trigger }: PropsWithChildren<{ trigger: ReactNode }>) => {
  const { steps, setIncreaseSteps, setDecreaseSteps, setSteps } =
    useLoginStepsStore();
  const [open, setOpen] = useState(false);
  const authCode = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (authCode) {
      getKakaoToken(authCode).then((res) => {
        // const { isNew, token } = res;
        if (authCode && res.isNew === false) {
          setSteps(1);
          setOpen(true);
        }
      });
    }
  }, [authCode, setSteps]);

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
    <AlertDialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content className="max-mobile:h-3/4 max-mobile:w-screen max-mobile:p-10 flex h-700 w-650 items-center justify-center rounded-20 bg-st-primary">
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
              <div className="cursor-pointer">
                <Icon
                  name="cross"
                  size={20}
                  color="text-black"
                />
              </div>
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
