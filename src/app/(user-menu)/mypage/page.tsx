"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/images/logo.svg";
import { cn } from "@/lib/utils";
import type {
  NicknameSchemaType,
  PositionAndStacksSchemaType,
} from "@/schemas/setNickname";
import { nicknameSchema, positionAndStacksSchema } from "@/schemas/setNickname";
import { userBioSchema } from "@/schemas/userBioSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetIcon } from "@radix-ui/react-icons";
import { Badge } from "@radix-ui/themes";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import getPositions from "@/services/steady/getPositions";
import getStacks from "@/services/steady/getStacks";
import type { UpdateMyProfileType } from "@/services/types";
import checkSameNickname from "@/services/user/checkSameNickname";
import deleteMyProfile from "@/services/user/deleteMyProfile";
import getMyProfile from "@/services/user/getMyProfile";
import updateMyProfile from "@/services/user/updateMyProfile";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import Input from "@/components/_common/Input";
import { AlertModal } from "@/components/_common/Modal";
import { MultiSelector, SingleSelector } from "@/components/_common/Selector";
import { extractValue } from "@/utils/extractValue";
import { subMyPageTextStyles } from "@/constants/commonStyle";

const subContentStyles = "flex flex-col gap-30";
const subBoxStyles =
  "px-30 py-20 gap-30 flex h-116 w-718 items-center rounded-6 border-2 border-st-gray-100";

const MyProfilePage = () => {
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const [isEditingStacks, setIsEditingStacks] = useState(false);
  const [sameNicknameChecked, setSameNicknameChecked] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const {
    data: myProfileData,
    isPending: myProfileIsLoading,
    error: myProfileError,
    refetch: myProfileRefetch,
  } = useSuspenseQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
  });

  const profileMutation = useMutation({
    mutationKey: ["profile"],
    mutationFn: (data: UpdateMyProfileType) => updateMyProfile(data),
    onSuccess: () => {
      toast({ description: "프로필 수정에 성공했습니다.", variant: "green" });
      myProfileRefetch();
    },
    onError: () => {
      toast({ description: "프로필 수정에 실패했습니다.", variant: "red" });
    },
  });

  const { data: stacksData } = useSuspenseQuery({
    queryKey: ["stacks"],
    queryFn: () => getStacks(),
    staleTime: Infinity,
  });
  const { data: positionsData } = useSuspenseQuery({
    queryKey: ["positions"],
    queryFn: () => getPositions(),
    staleTime: Infinity,
  });
  // TODO: 프로필 이미지 업로드 기능 구현
  const { nickname, bio, position, stacks, platform } = myProfileData;

  const nicknameForm = useForm<NicknameSchemaType>({
    mode: "onChange",
    resolver: zodResolver(nicknameSchema),
  });

  const positionAndStacksForm = useForm({
    mode: "onChange",
    values: {
      positionId: position.id,
      stacksId: stacks.map((stack) => stack.id),
    },
    resolver: zodResolver(positionAndStacksSchema),
  });

  const userBioForm = useForm({
    mode: "onChange",
    values: { bio: bio },
    resolver: zodResolver(userBioSchema),
  });

  if (myProfileError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (myProfileIsLoading) {
    return <div>로딩중...</div>;
  }

  const handleCheckSameNickname = (nickname: string) => {
    checkSameNickname(nickname)
      .then((res) => {
        if (res.exist) {
          toast({ description: "이미 사용중인 닉네임입니다.", variant: "red" });
          return;
        } else {
          toast({ description: "사용 가능한 닉네임입니다!", variant: "green" });
          setSameNicknameChecked(true);
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          description: "닉네임 중복 확인에 실패했습니다.",
          variant: "red",
        });
      });
    return;
  };

  const handleUpdateNickName = (data: { nickname: string }) => {
    if (!sameNicknameChecked) {
      toast({ description: "닉네임 중복 확인을 해주세요.", variant: "red" });
      return;
    } else {
      const newData = {
        nickname: data.nickname,
        bio: myProfileData.bio,
        profileImage: myProfileData.profileImage,
        positionId: myProfileData.position.id,
        stacksId: myProfileData.stacks.map((stack) => stack.id),
      };
      profileMutation.mutate(newData);
      setSameNicknameChecked(false);
      setIsEditingNickname(false);
    }
  };

  const handleUpdatePositionsAndStacks = (
    data: PositionAndStacksSchemaType,
  ) => {
    const newData = {
      nickname: myProfileData.nickname,
      bio: myProfileData.bio,
      profileImage: myProfileData.profileImage,
      ...data,
    };
    profileMutation.mutate(newData);
  };

  const stacksInitialData = stacks.map((stack) => ({
    label: stack.name,
    value: stack.id.toString(),
  }));

  const handleUpdateBio = (data: { bio: string }) => {
    const newData = {
      nickname: myProfileData.nickname,
      bio: data.bio,
      profileImage: myProfileData.profileImage,
      positionId: myProfileData.position.id,
      stacksId: myProfileData.stacks.map((stack) => stack.id),
    };
    profileMutation.mutate(newData);
    setIsEditingBio(false);
  };

  const handleDeleteAccount = async () => {
    deleteMyProfile().then((res) => {
      if (res.status === 204) {
        toast({ description: "회원 탈퇴에 성공했습니다.", variant: "green" });
        router.replace("/logout");
      } else {
        toast({ description: "회원 탈퇴에 실패했습니다.", variant: "red" });
      }
    });
  };

  return (
    <div className="flex h-full flex-col gap-100">
      <div className="flex flex-col gap-20">
        <div className="text-30 font-bold">내 프로필</div>
        <div className="flex flex-col items-center justify-center gap-20">
          <label
            htmlFor="profile"
            className="group relative flex cursor-pointer items-center justify-center transition-transform"
          >
            <Image
              src={Logo}
              alt={"내 프로필 이미지"}
              width={150}
              height={150}
              className="border-black rounded-full border-2 transition-opacity group-hover:opacity-50"
            />
            <div className="absolute top-1/2 flex -translate-y-1/2 transform flex-col items-center justify-center text-center text-lg font-semibold opacity-0 transition-opacity group-hover:opacity-100">
              클릭하여
              <div className="flex flex-row items-center justify-center">
                수정
                <Icon
                  name="pencil"
                  size={20}
                  color="text-st-black"
                />
              </div>
            </div>
          </label>
          <input
            type="file"
            id="profile"
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-row items-center justify-center gap-10">
            {isEditingNickname ? (
              <Form {...nicknameForm}>
                <form
                  onSubmit={nicknameForm.handleSubmit(handleUpdateNickName)}
                >
                  <FormField
                    control={nicknameForm.control}
                    name={"nickname"}
                    render={({ field }) => (
                      <div className={"flex flex-col"}>
                        <div className="flex items-center justify-center gap-10">
                          <Input
                            inputName="name-input"
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                          {!sameNicknameChecked ? (
                            <>
                              <Button
                                className={`${cn(
                                  buttonSize.sm,
                                )} cursor-pointer bg-st-primary text-st-white`}
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleCheckSameNickname(field.value);
                                }}
                                disabled={sameNicknameChecked}
                              >
                                중복 확인
                              </Button>
                              <ResetIcon
                                className={"cursor-pointer"}
                                onClick={() => {
                                  nicknameForm.reset();
                                  setSameNicknameChecked(false);
                                  setIsEditingNickname(false);
                                }}
                                width={22}
                                height={22}
                              />
                            </>
                          ) : (
                            <button type={"submit"}>
                              <Icon
                                name="check"
                                size={30}
                                color="text-st-green"
                              />
                            </button>
                          )}
                        </div>
                        <FormMessage />
                      </div>
                    )}
                  />
                </form>
              </Form>
            ) : (
              <>
                {/* TODO: 닉네임 state로 관리 */}
                <div className="text-25 font-bold">{nickname}</div>
                <button onClick={() => setIsEditingNickname(true)}>
                  <Icon
                    name="pencil"
                    size={30}
                    color="text-st-black"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={cn(subContentStyles)}>
        <div className={cn(subMyPageTextStyles.title)}>포지션 / 스택</div>
        <Form {...positionAndStacksForm}>
          <form
            onSubmit={positionAndStacksForm.handleSubmit(
              handleUpdatePositionsAndStacks,
            )}
          >
            <div className={cn(subBoxStyles, "h-150 flex-col py-25")}>
              <div className="flex items-center justify-center gap-10">
                {isEditingPosition ? (
                  <>
                    <FormField
                      control={positionAndStacksForm.control}
                      name={"positionId"}
                      render={() => (
                        <FormItem className="flex flex-col gap-10">
                          <SingleSelector
                            initialLabel={position.name ?? "포지션"}
                            items={positionsData.positions.map((position) => ({
                              value: position.id.toString(),
                              label: position.name,
                            }))}
                            onSelectedChange={(selected) => {
                              positionAndStacksForm.setValue(
                                "positionId",
                                Number(selected),
                              );
                            }}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <button
                      type={"submit"}
                      onClick={() => setIsEditingPosition(false)}
                    >
                      <Icon
                        name="check"
                        size={30}
                        color="text-st-green"
                      />
                    </button>
                    <ResetIcon
                      width="25"
                      height="25"
                      className={"cursor-pointer"}
                      onClick={() => setIsEditingPosition(false)}
                    />
                  </>
                ) : (
                  <>
                    <Badge size={"2"}>{position.name}</Badge>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setIsEditingPosition(true);
                      }}
                      className={"cursor-pointer"}
                    >
                      <Icon
                        name="pencil"
                        size={25}
                        color="text-st-black"
                      />
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center justify-center gap-10">
                {isEditingStacks ? (
                  <>
                    <FormField
                      control={positionAndStacksForm.control}
                      name={"stacksId"}
                      render={() => (
                        <FormItem className="flex flex-col gap-10">
                          <MultiSelector
                            initialLabel={"기술 스택"}
                            initialData={stacksInitialData}
                            items={stacksData.stacks.map((stack) => ({
                              value: stack.id.toString(),
                              label: stack.name,
                            }))}
                            onSelectedChange={(selected) => {
                              positionAndStacksForm.setValue(
                                "stacksId",
                                extractValue(selected).map(Number),
                              );
                            }}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <button
                      type={"submit"}
                      onClick={() => setIsEditingStacks(false)}
                    >
                      <Icon
                        name="check"
                        size={30}
                        color="text-st-green"
                      />
                    </button>
                    <ResetIcon
                      width="25"
                      height="25"
                      className={"cursor-pointer"}
                      onClick={() => setIsEditingStacks(false)}
                    />
                  </>
                ) : (
                  <>
                    {stacks.map((stack) => (
                      <Badge
                        key={stack.id}
                        size={"2"}
                      >
                        {stack.name}
                      </Badge>
                    ))}
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setIsEditingStacks(true);
                      }}
                    >
                      <Icon
                        name="pencil"
                        size={25}
                        color="text-st-black"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>

      <div className={cn(subContentStyles)}>
        <div className={cn(subMyPageTextStyles.title)}>한 줄 소개</div>
        <Form {...userBioForm}>
          <form onSubmit={userBioForm.handleSubmit(handleUpdateBio)}>
            {isEditingBio ? (
              <FormField
                control={userBioForm.control}
                name={"bio"}
                render={({ field }) => (
                  <div className="flex items-center justify-center gap-10">
                    <Input
                      inputName="introduce-input"
                      defaultValue={bio}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                    <button type={"submit"}>
                      <Icon
                        name="check"
                        size={30}
                        color="text-st-green"
                      />
                    </button>
                    <ResetIcon
                      width="25"
                      height="25"
                      className={"cursor-pointer"}
                      onClick={() => setIsEditingBio(false)}
                    />
                  </div>
                )}
              />
            ) : (
              <div
                className={cn(
                  subBoxStyles,
                  "justify-center text-2xl italic text-st-gray-250",
                )}
              >
                {bio ?? "한 줄 소개를 입력해주세요."}
                <button onClick={() => setIsEditingBio(true)}>
                  <Icon
                    name="pencil"
                    size={25}
                    color="text-st-black"
                  />
                </button>
              </div>
            )}
          </form>
        </Form>
      </div>

      <div className={cn(subContentStyles)}>
        <div className={cn(subMyPageTextStyles.title)}>소셜 인증</div>
        <div className={cn(subBoxStyles)}>
          {platform === "KAKAO" && (
            <>
              <Image
                src={"/images/kakaologo.png"}
                alt="카카오 로고"
                width={60}
                height={60}
              />
              <div
                className={cn(
                  subMyPageTextStyles.content,
                  "flex-grow text-center",
                )}
              >
                카카오 인증이 완료되었습니다 ✅
              </div>
            </>
          )}
        </div>
      </div>
      <div className={cn(subContentStyles)}>
        <div className={cn(subMyPageTextStyles.title)}>회원 탈퇴</div>
        <div className={cn(subBoxStyles, "justify-between")}>
          <div className={cn(subMyPageTextStyles.content)}>
            회원 탈퇴 시 전체 프로필 정보가 삭제 됩니다.
          </div>
          <AlertModal
            trigger={
              <Button
                className={`${cn(buttonSize.md)} bg-st-red text-st-white`}
              >
                회원 탈퇴
              </Button>
            }
            actionButton={
              <Button
                className={`${cn(buttonSize.sm)} bg-st-red text-st-white`}
                onClick={(event) => {
                  event.preventDefault();
                  handleDeleteAccount();
                }}
              >
                탈퇴
              </Button>
            }
          >
            정말 스테디를 탈퇴하시겠습니까?
          </AlertModal>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
