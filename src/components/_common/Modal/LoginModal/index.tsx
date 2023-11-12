"use client";

import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import useLoginStepsStore from "@/stores/loginSteps";
import newUserInfoStore from "@/stores/newUserInfo";
import useNewUserInfoStore from "@/stores/newUserInfo";
import { AlertDialog } from "@radix-ui/themes";
import getKakaoToken from "@/services/oauth/kakao/getKakaoToken";
import createUserProfile from "@/services/user/createUserProfile";
import Icon from "@/components/_common/Icon";
import { setAccessToken, setRefreshToken } from "@/utils/cookies";
import Button, { buttonSize } from "../../Button";
import LoginStepsContainer from "./LoginStepsContainer";

// TODO: steps 검사 필요 (0~5)가 아닌것들...
const LoginModal = ({ trigger }: PropsWithChildren<{ trigger: ReactNode }>) => {
  const { steps, setDecreaseSteps, setSteps } = useLoginStepsStore();
  const { accountId, nickname, positionId, stackIds } = useNewUserInfoStore();
  const { setAccountId } = newUserInfoStore();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const authCode = searchParams.get("code");
    if (authCode) {
      getKakaoToken(authCode).then((data) => {
        if (data) {
          const { id, isNew, token } = data;
          // TODO: 나중에 isNew로 변경
          if (!isNew) {
            setAccessToken(token.accessToken);
            setRefreshToken(token.refreshToken);
            setAccountId(id);
            setSteps(1);
            setOpen(true);
          }
        }
      });
    }
  }, [setSteps, searchParams, setAccountId]);

  const handleCreateProfile = async () => {
    try {
      const userProfileCreated = await createUserProfile({
        accountId,
        nickname,
        positionId,
        stackIds,
      });
      if (userProfileCreated) {
        localStorage.clear();
      }
    } catch (error) {
      console.error("프로필 생성 실패", error);
    }
  };

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content className="max-mobile:h-3/4 max-mobile:w-screen max-mobile:p-10 flex h-700 w-650 items-center justify-center overflow-y-hidden rounded-20 bg-st-primary">
        <div className="flex h-full w-full flex-col items-center justify-between rounded-20 bg-st-white p-20">
          <div
            className={`flex w-full ${
              steps === 0 ? "justify-end" : "justify-between"
            }`}
          >
            {steps !== 0 && (
              <button
                className="h-fit w-fit"
                onClick={() => {
                  if (steps) {
                    setDecreaseSteps();
                  }
                }}
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
          <AlertDialog.Action>
            {steps === 5 && (
              <Button
                className={`${buttonSize.md} bg-st-primary text-st-white`}
                onClick={handleCreateProfile}
              >
                시작하기
              </Button>
            )}
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default LoginModal;
