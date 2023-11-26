"use client";

import { type PropsWithChildren, type ReactNode, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useAuthStore from "@/stores/isAuth";
import useLoginModalOpenStore from "@/stores/loginModalOpen";
import useLoginStepsStore from "@/stores/loginSteps";
import useNewUserInfoStore from "@/stores/newUserInfo";
import { AlertDialog } from "@radix-ui/themes";
import { setCookie } from "cookies-next";
import getKakaoToken from "@/services/oauth/kakao/getKakaoToken";
import createUserProfile from "@/services/user/createUserProfile";
import Icon from "@/components/_common/Icon";
import Button, { buttonSize } from "../../Button";
import LoginStepsContainer from "./LoginStepsContainer";

const LoginModal = ({ trigger }: PropsWithChildren<{ trigger: ReactNode }>) => {
  const { steps, setDecreaseSteps, setSteps } = useLoginStepsStore();
  const { accountId, nickname, positionId, stacksId, setAccountId } =
    useNewUserInfoStore();
  const { isOpen, setIsOpen } = useLoginModalOpenStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsAuth } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    const authCode = searchParams.get("code");
    if (authCode) {
      getKakaoToken(authCode).then((data) => {
        if (data) {
          const { id, isNew, token } = data;
          if (isNew) {
            setAccountId(id);
            setSteps(1);
            setIsOpen(true);
          } else {
            // axios
            //   .post("https://steady-client.vercel.app/api/login", {
            //     token: {
            //       access: token.accessToken,
            //       refresh: token.refreshToken,
            //     },
            //   })
            //   .then(() => {
            //     setIsAuth(true);
            //     router.replace("/");
            //   });
            setCookie("access_token", token.accessToken, {
              path: "/",
              domain: ".steadies.kr",
            });
            setCookie("refresh_token", token.refreshToken, {
              path: "/",
              domain: ".steadies.kr",
            });
            setIsAuth(true);
            router.replace("/");
          }
        }
      });
    }
  }, [setSteps, searchParams]);

  const handleCreateProfile = async () => {
    try {
      const userProfileCreated = await createUserProfile({
        accountId,
        nickname,
        positionId,
        stacksId,
      });
      if (userProfileCreated) {
        toast({
          description: "프로필 생성 성공",
          variant: "green",
        });
        useNewUserInfoStore.persist.clearStorage();
        setSteps(6);
        //useLoginStepsStore.persist.clearStorage();
        router.push(`${userProfileCreated.headers.location}`);
      }
    } catch (error) {
      console.error("프로필 생성 실패", error);
      toast({
        description: "프로필 생성을 실패했습니다.",
        variant: "red",
      });
    }
  };

  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}
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
