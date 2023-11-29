"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import DeleteUserLogo from "@/images/DeleteUser.svg";
import { cn } from "@/lib/utils";
import { Badge, Separator, Tabs } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import deleteSteady from "@/services/steady/deleteSteady";
import deleteSteadyMember from "@/services/steady/deleteSteadyMember";
import finishSteady from "@/services/steady/finishSteady";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import getSteadyParticipants from "@/services/steady/getSteadyParticipants";
import getMyProfile from "@/services/user/getMyProfile";
import getUserProfile from "@/services/user/getUserProfile";
import Button, { buttonSize } from "@/components/_common/Button";
import { AlertModal } from "@/components/_common/Modal";
import {
  subBoxStyles,
  subContentStyles,
  subMyPageTextStyles,
} from "@/constants/commonStyle";
import {
  getSteadyDetailsKey,
  getSteadyParticipantsKey,
  getUserProfileKey,
} from "@/constants/queryKeys";

const SteadyManagePage = ({ params }: { params: { id: string } }) => {
  const steadyId = params.id;
  const { toast } = useToast();
  const router = useRouter();

  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const { data: steadyDetailsData, error } = useSuspenseQuery({
    queryKey: getSteadyDetailsKey(steadyId),
    queryFn: () => getSteadyDetails(steadyId),
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    const leaderId = steadyDetailsData.leaderResponse.id;
    getMyProfile().then((res) => {
      if (res.userId !== leaderId) {
        toast({
          description: "스테디 운영 페이지에 접근 권한이 없습니다.",
          variant: "red",
        });
        router.replace(`/steady/detail/${steadyId}`);
      }
    });
  }, []);

  const {
    data: steadyParticipantsData,
    error: steadyParticipantsError,
    refetch: refetchSteadyParticipant,
  } = useSuspenseQuery({
    queryKey: getSteadyParticipantsKey(steadyId),
    queryFn: () => getSteadyParticipants(steadyId),
    staleTime: 1000 * 60,
  });

  const { data: participantDetailsData, error: participantDetailsError } =
    useSuspenseQuery({
      queryKey: [
        getUserProfileKey(
          steadyParticipantsData.participants[currentUserIndex].id,
        ),
      ],
      queryFn: () =>
        getUserProfile(
          steadyParticipantsData.participants[currentUserIndex].id.toString(),
        ),
      staleTime: 1000 * 60,
    });

  const handleFinishSteady = () => {
    finishSteady(steadyId)
      .then(() => {
        toast({ description: "스테디가 종료되었습니다.", variant: "green" });
        router.replace(`/steady/detail/${steadyId}`);
      })
      .catch(() => {
        toast({ description: "스테디 종료에 실패했습니다.", variant: "red" });
      });
  };

  const handleDeleteSteady = () => {
    deleteSteady(steadyId)
      .then(() => {
        toast({ description: "스테디가 삭제되었습니다.", variant: "green" });
        router.replace(`/mysteady`);
      })
      .catch(() => {
        toast({ description: "스테디 삭제에 실패했습니다.", variant: "red" });
      });
  };

  const handleBanMember = () => {
    deleteSteadyMember(
      steadyId,
      steadyParticipantsData.participants[currentUserIndex].id.toString(),
    )
      .then(() => {
        toast({ description: "멤버를 추방했습니다.", variant: "green" });
        setCurrentUserIndex(0);
        refetchSteadyParticipant();
      })
      .catch(() => {
        toast({ description: "멤버 추방에 실패했습니다.", variant: "red" });
      });
  };

  if (error || steadyParticipantsError || participantDetailsError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div className="flex w-1000 flex-col">
      <div className="mb-20 flex items-center justify-between">
        <div className="text-30 font-bold">
          {`${steadyDetailsData.name} 운영 페이지`}
        </div>
        <div className="flex gap-20">
          <Link href={`/steady/applicant/${steadyId}`}>
            <Button
              className={`${cn(
                buttonSize.sm,
                "w-130 bg-st-primary text-16 text-st-white",
              )}`}
            >
              신청자 보기
            </Button>
          </Link>
          <AlertModal
            trigger={
              <Button
                className={`${cn(
                  buttonSize.sm,
                  "w-130 bg-st-red text-16 text-st-white",
                )}`}
              >
                스테디 종료
              </Button>
            }
            actionButton={
              <Button
                className={`${buttonSize.sm} bg-st-red text-16 text-st-white`}
                onClick={handleFinishSteady}
              >
                종료
              </Button>
            }
          >
            <div className={cn("text-center text-18 font-light")}>
              정말 스테디를 종료하겠습니까? <br /> 종료 시 되돌릴 수 없습니다.
            </div>
          </AlertModal>
          <AlertModal
            trigger={
              <Button
                className={`${cn(
                  buttonSize.sm,
                  "w-130 bg-st-red text-16 text-st-white",
                )}`}
              >
                스테디 삭제
              </Button>
            }
            actionButton={
              <Button
                className={`${buttonSize.sm} bg-st-red text-16 text-st-white`}
                onClick={handleDeleteSteady}
              >
                삭제
              </Button>
            }
          >
            <div className={cn("text-center text-18 font-light")}>
              정말 스테디를 삭제하겠습니까? <br /> 삭제 시 되돌릴 수 없습니다.
            </div>
          </AlertModal>
        </div>
      </div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
      <div className="flex overflow-x-hidden">
        <Tabs.Root
          defaultValue={`${steadyParticipantsData.participants[0].id}`}
        >
          <Tabs.List className="flex w-1000 gap-10">
            {steadyParticipantsData.participants.map((participant) => (
              <Tabs.Trigger
                key={participant.id}
                value={participant.id.toString()}
                className="cursor-pointer"
                onClick={() => {
                  setCurrentUserIndex(
                    steadyParticipantsData.participants.findIndex(
                      (item) => item.id === participant.id,
                    ),
                  );
                }}
              >
                {participant.nickname}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <div className={"flex justify-center"}>
            {steadyParticipantsData.participants.map((participant) => (
              <Tabs.Content
                key={participant.id}
                value={participant.id.toString()}
                className="p-30"
              >
                {!participantDetailsData.isDeleted ? (
                  <div>
                    <div
                      className={cn(
                        "flex w-full flex-col justify-center text-center",
                      )}
                    >
                      <div className={cn(subContentStyles, "items-center")}>
                        <div className={cn(subMyPageTextStyles.title)}>
                          멤버 정보
                        </div>
                        <Image
                          src={participantDetailsData.user.profileImage}
                          alt={"내 프로필 이미지"}
                          width={150}
                          height={150}
                          className="border-black rounded-full border-2 transition-opacity group-hover:opacity-50"
                        />
                        <div
                          className={cn(
                            subMyPageTextStyles.content,
                            "flex flex-col gap-y-5",
                          )}
                        >
                          {participantDetailsData.user.nickname}
                          <div className={cn("justify-center")}>
                            <Badge size={"1"}>
                              {participantDetailsData.user.position.name}
                            </Badge>
                          </div>
                          <div className={cn("my-10 justify-center")}>
                            {participantDetailsData.user.stacks.map((stack) => (
                              <Badge
                                className={cn("mx-5")}
                                size={"1"}
                                color={"gray"}
                                key={stack.id}
                              >
                                {stack.name}
                              </Badge>
                            ))}
                          </div>
                          <div
                            className={cn(
                              "my-10 justify-center text-st-gray-250",
                            )}
                          >
                            {participantDetailsData.user.bio ??
                              "소개가 없습니다."}
                          </div>
                          <div
                            className={cn(
                              "flex items-center justify-center gap-30",
                            )}
                          >
                            {participantDetailsData.userCards.map((card) => (
                              <div
                                key={card.cardId}
                                className={cn(
                                  subMyPageTextStyles.content,
                                  "flex h-65 flex-col justify-between",
                                )}
                              >
                                <Image
                                  src={card.imageUrl}
                                  alt="카드 이미지"
                                  width={30}
                                  height={30}
                                />
                                <div
                                  className={cn(subMyPageTextStyles.content)}
                                >
                                  {`( ${card.count} )`}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div
                            className={cn(subMyPageTextStyles.content, "my-20")}
                          >
                            <div
                              className={cn("my-10 flex flex-col items-center")}
                            >
                              {participantDetailsData.reviews.length}개의 리뷰
                            </div>
                            <ScrollArea
                              className={cn(
                                "flex h-230 w-450 flex-col gap-20 border-1",
                              )}
                            >
                              {participantDetailsData.reviews.map(
                                (review, idx) => (
                                  <>
                                    <div
                                      key={idx}
                                      className="flex items-center justify-center text-st-gray-250"
                                    >
                                      {review}
                                    </div>
                                    <Separator className="h-1 w-auto bg-st-gray-100" />
                                  </>
                                ),
                              )}
                            </ScrollArea>
                          </div>
                        </div>
                      </div>
                    </div>
                    {steadyDetailsData.leaderResponse.id !==
                      participantDetailsData.user.userId && (
                      <div className={cn(subContentStyles)}>
                        <div className={cn(subBoxStyles, "justify-between")}>
                          <div className={cn(subMyPageTextStyles.content)}>
                            스테디 참여자 추방 시 되돌릴 수 없습니다.
                          </div>
                          {/* TODO: 유저 추방 기능 구현 */}
                          <AlertModal
                            trigger={
                              <Button
                                className={`${buttonSize.lg} bg-st-red text-st-white`}
                              >
                                멤버 추방
                              </Button>
                            }
                            actionButton={
                              <Button
                                className={`${buttonSize.sm} bg-st-red text-st-white`}
                                onClick={handleBanMember}
                              >
                                추방
                              </Button>
                            }
                          >
                            정말 해당 멤버를 추방하시겠습니까?
                          </AlertModal>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex h-full w-full flex-col items-center justify-evenly gap-20">
                      <Image
                        src={DeleteUserLogo}
                        alt="탈퇴한 유저 이미지"
                        width={150}
                        height={150}
                      />
                      <div className="text-25 font-bold">
                        탈퇴한 유저 입니다.
                      </div>
                    </div>
                    <div className={cn(subContentStyles, "pt-30")}>
                      <div className={cn(subBoxStyles, "justify-between")}>
                        <div className={cn(subMyPageTextStyles.content)}>
                          스테디 참여자 추방 시 되돌릴 수 없습니다.
                        </div>
                        {/* TODO: 유저 추방 기능 구현 */}
                        <AlertModal
                          trigger={
                            <Button
                              className={`${buttonSize.lg} bg-st-red text-st-white`}
                            >
                              멤버 추방
                            </Button>
                          }
                          actionButton={
                            <Button
                              className={`${buttonSize.sm} bg-st-red text-st-white`}
                              onClick={handleBanMember}
                            >
                              추방
                            </Button>
                          }
                        >
                          정말 해당 멤버를 추방하시겠습니까?
                        </AlertModal>
                      </div>
                    </div>
                  </div>
                )}
              </Tabs.Content>
            ))}
          </div>
        </Tabs.Root>
      </div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
    </div>
  );
};

export default SteadyManagePage;
