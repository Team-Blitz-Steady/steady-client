"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/images/logo.svg";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/isAuth";
import { Separator } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import deleteApplication from "@/services/application/deleteApplication";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import getSteadyParticipants from "@/services/steady/getSteadyParticipants";
import likeSteady from "@/services/steady/likeSteady";
import promoteSteady from "@/services/steady/promoteSteady";
import type { SteadyDetailsType } from "@/services/types";
import Button, { buttonSize } from "@/components/_common/Button";
import Dropdown from "@/components/_common/Dropdown";
import Icon from "@/components/_common/Icon";
import { AlertModal, InfoModal, UserModal } from "@/components/_common/Modal";
import LoginModal from "@/components/_common/Modal/LoginModal";
import UserItems from "@/components/_common/Modal/UserModal/UserItems";
import Spinner from "@/components/_common/Spinner";
import Tag from "@/components/_common/Tag";
import { steadyCategoriesWithEmoji } from "@/constants/labelData";
import {
  getSteadyDetailsKey,
  getSteadyParticipantsKey,
} from "@/constants/queryKeys";
import {
  steadyExpectedPeriods,
  steadyRunningMethods,
} from "@/constants/selectorItems";

const steadyDetailTagItems =
  "flex h-40 min-w-100 items-center justify-center rounded-20 bg-st-primary text-center text-st-white shadow-md";

const SteadyDetailPage = ({ params }: { params: { id: string } }) => {
  const steadyId = params.id;
  const { data: steadyDetailsData, refetch: steadyDetailsRefetch } =
    useSuspenseQuery({
      queryKey: getSteadyDetailsKey(steadyId),
      queryFn: () => getSteadyDetails(steadyId),
      staleTime: 10000,
    });
  const { data: steadyParticipantsData } = useSuspenseQuery({
    queryKey: getSteadyParticipantsKey(steadyId),
    queryFn: () => getSteadyParticipants(steadyId),
  });

  const router = useRouter();
  const { toast } = useToast();
  const { isAuth } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const [isLiked, setIsLiked] = useState(steadyDetailsData.isLiked);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  const handleClickPromoteBtn = async (steadyId: string) => {
    if (steadyDetailsData.promotionCount <= 0) {
      toast({
        description: "스터디 끌어올리기 횟수를 다 사용했습니다!",
        variant: "red",
      });
    }
    const isPromote = await promoteSteady(steadyId);
    if (isPromote) {
      toast({
        description: "스터디 끌어올리기를 성공했습니다!",
        variant: "green",
      });
      steadyDetailsRefetch();
    }
  };

  const handleClickDeleteApplication = async () => {
    try {
      await deleteApplication(steadyDetailsData.applicationId.toString());
      toast({
        description: "스테디 신청 취소 성공!",
        variant: "green",
      });
    } catch (error) {
      toast({
        description: "스테디 신청 취소 실패!",
        variant: "red",
      });
      console.error(error);
    }
    steadyDetailsRefetch();
  };

  const matchingData = (
    defineData: { value: string; label: string }[],
    serverData:
      | SteadyDetailsType["status"]
      | SteadyDetailsType["steadyMode"]
      | SteadyDetailsType["scheduledPeriod"],
  ) => {
    const match = defineData.find((item) => item.value === serverData);
    return match ? match.label : null;
  };

  const handleClickLike = async () => {
    await likeSteady(steadyId);
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="w-1000">
      <div className="flex flex-col gap-20">
        <button onClick={() => router.back()}>
          <Icon
            name="arrow-left"
            size={30}
            color="text-black"
          />
        </button>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-20">
            <Tag status={steadyDetailsData.status} />
            <div className="text-35 font-bold">{steadyDetailsData.name}</div>
          </div>
          <button onClick={handleClickLike}>
            {isLiked ? (
              <Icon
                name="heart"
                size={30}
                color="text-st-red"
              />
            ) : (
              <Icon
                name="empty-heart"
                size={30}
                color="text-black"
              />
            )}
          </button>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-20">
            <UserModal
              trigger={
                <div className="flex gap-10">
                  <Image
                    className="cursor-pointer rounded-full border-1"
                    src={
                      `/${steadyDetailsData.leaderResponse.profileImage}`
                        ? `/${steadyDetailsData.leaderResponse.profileImage}`
                        : Logo
                    }
                    alt="작성자 프로필"
                    width={60}
                    height={60}
                  />
                  <button className="text-20 font-bold">
                    {steadyDetailsData.leaderResponse.nickname}
                  </button>
                </div>
              }
            >
              <Suspense fallback={<Spinner size="large" />}>
                <UserItems userId={steadyDetailsData.leaderResponse.id} />
              </Suspense>
            </UserModal>
            <div className="flex gap-10 text-16 font-bold text-st-gray-100">
              <span>
                {format(new Date(steadyDetailsData.createdAt), "yyyy.MM.dd p")}
              </span>
            </div>
          </div>
          <div className="flex gap-20">
            {steadyDetailsData.status === "FINISHED" &&
              steadyDetailsData.isReviewEnabled && (
                <Link
                  href={`/steady/review/${steadyDetailsData.id}`}
                  replace={true}
                >
                  <Button
                    className={`${buttonSize.md} bg-st-primary text-st-white`}
                  >
                    리뷰 남기기
                  </Button>
                </Link>
              )}
            {steadyDetailsData.isLeader ? (
              <Link
                href={`/steady/applicant/${steadyDetailsData.id}`}
                replace={true}
              >
                <Button
                  className={`${buttonSize.md} bg-st-primary text-st-white`}
                >
                  신청자 보기
                </Button>
              </Link>
            ) : (
              <InfoModal
                trigger={
                  <Button
                    className={`${buttonSize.md} bg-st-primary text-st-white`}
                  >
                    참여자 보기
                  </Button>
                }
              >
                <div className="flex flex-col items-center justify-center gap-10">
                  <div className="flex flex-col items-center justify-center gap-10">
                    <Image
                      className="cursor-pointer rounded-full border-1"
                      src={
                        `/${steadyDetailsData.leaderResponse.profileImage}`
                          ? `/${steadyDetailsData.leaderResponse.profileImage}`
                          : Logo
                      }
                      alt="참여자 이미지"
                      width={80}
                      height={80}
                    />
                    <button className="text-20 font-bold">
                      {steadyDetailsData.leaderResponse.nickname}
                    </button>
                  </div>
                  {steadyParticipantsData.participants.map((participant) => (
                    <div key={participant.id}>
                      {!participant.isLeader && (
                        <>
                          <UserModal
                            trigger={
                              <div className="flex flex-col items-center justify-center gap-10">
                                <Image
                                  className="cursor-pointer rounded-full border-1"
                                  src={
                                    `/${participant.profileImage}`
                                      ? `/${participant.profileImage}`
                                      : Logo
                                  }
                                  alt="참여자 이미지"
                                  width={80}
                                  height={80}
                                />
                                <button className="text-18 font-bold">
                                  {participant.nickname}
                                </button>
                              </div>
                            }
                          >
                            <Suspense fallback={<Spinner size="medium" />}>
                              <UserItems userId={participant.id} />
                            </Suspense>
                          </UserModal>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </InfoModal>
            )}
          </div>
        </div>
        <Separator className="h-2 w-auto bg-st-gray-75" />
      </div>
      <div className="flex h-full w-full flex-col bg-st-white-100 p-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-row justify-between">
            <div className="flex items-center text-18 font-bold text-st-gray-400">
              {steadyCategoriesWithEmoji[steadyDetailsData.type]}
            </div>
            {steadyDetailsData.isLeader &&
              steadyDetailsData.status !== "FINISHED" && (
                <div className="flex flex-row gap-10">
                  <AlertModal
                    trigger={
                      <Button className="h-30 w-170 bg-st-primary text-16 font-bold text-st-white">
                        최신글로 등록하기
                      </Button>
                    }
                    actionButton={
                      <Button
                        className={`${buttonSize.sm} bg-st-primary text-st-white`}
                        onClick={() =>
                          handleClickPromoteBtn(steadyDetailsData.id.toString())
                        }
                      >
                        등록
                      </Button>
                    }
                  >
                    <button className="flex flex-col items-center justify-center gap-10 text-16 font-bold">
                      현재 최신글로 등록할 수 있는 남은 횟수
                      <span className=" text-20 text-st-primary">
                        {steadyDetailsData.promotionCount}
                      </span>
                      등록하시겠습니까?
                    </button>
                  </AlertModal>
                  <Dropdown
                    options={[
                      {
                        label: "스테디 수정",
                        linkTo: `/steady/edit/${steadyDetailsData.id}`,
                      },
                      {
                        label: "스테디 운영",
                        linkTo: `/steady/manage/${steadyDetailsData.id}`,
                      },
                      {
                        label: "질문 수정",
                        linkTo: `/steady/edit/questions/${steadyDetailsData.id}`,
                      },
                    ]}
                  >
                    <Icon
                      name="gear"
                      size={25}
                      color="text-st-gray-200"
                    />
                  </Dropdown>
                </div>
              )}
          </div>
          <div className="text-35 font-bold">{steadyDetailsData.title}</div>
          <div className="text-20 font-bold italic text-st-gray-400">
            {steadyDetailsData.bio}
          </div>
        </div>
        <div className="mb-200 mt-100 flex h-350 flex-col items-center justify-evenly px-50 text-18 font-bold shadow-md">
          <div className="flex w-full gap-15">
            <div className="flex flex-grow items-center gap-30">
              <div className={steadyDetailTagItems}>모집 분야</div>
              <div className="flex w-0 flex-grow flex-wrap gap-10">
                {steadyDetailsData.positions.map((position, id) => (
                  <div
                    key={id}
                    className="whitespace-nowrap"
                  >
                    {position.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full gap-15">
            <div className="flex w-full">
              <div className="flex w-225 items-center gap-30">
                <div className={steadyDetailTagItems}>진행 방식</div>
                <div>
                  {matchingData(
                    steadyRunningMethods,
                    steadyDetailsData.steadyMode,
                  )}
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="flex flex-grow items-center gap-30">
                <div className={steadyDetailTagItems}>예상 기간</div>
                {matchingData(
                  steadyExpectedPeriods,
                  steadyDetailsData.scheduledPeriod,
                )}
              </div>
            </div>
            <div className="flex w-full">
              <div className="flex w-225 items-center gap-30">
                <div className={steadyDetailTagItems}>마감일</div>
                <div>
                  {format(new Date(steadyDetailsData.deadline), "yyyy.MM.dd")}
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-30">
            <div className={steadyDetailTagItems}>기술 스택</div>
            <div className="flex w-full flex-wrap gap-10">
              {steadyDetailsData.stacks.map((stack) => (
                <Image
                  key={stack.id}
                  src={stack.imageUrl}
                  alt="기술 스택"
                  width={40}
                  height={40}
                  className="rounded-full border-1"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex min-h-200 w-full items-center p-20 text-18 font-bold shadow-md">
          {steadyDetailsData.content}
        </div>
      </div>
      <Separator className="mb-20 h-2 w-auto bg-st-gray-75" />
      <div className="flex flex-col gap-20">
        <div className="flex flex-row items-center justify-end gap-10">
          {!steadyDetailsData.isLeader &&
            !steadyDetailsData.isReviewEnabled && (
              <>
                {steadyDetailsData.applicationId !== null ? (
                  <>
                    <Link
                      href={`/application/edit/${steadyDetailsData.id}/${steadyDetailsData.applicationId}`}
                    >
                      <Button
                        className={`${buttonSize.sm} bg-st-primary text-14 text-st-white`}
                      >
                        신청서 수정
                      </Button>
                    </Link>
                    <AlertModal
                      trigger={
                        <Button
                          className={`${buttonSize.sm} bg-st-red text-st-white`}
                        >
                          신청 취소
                        </Button>
                      }
                      actionButton={
                        <Button
                          className={`${buttonSize.sm} bg-st-primary text-st-white`}
                          onClick={handleClickDeleteApplication}
                        >
                          예
                        </Button>
                      }
                    >
                      <span className="text-center text-18 font-bold">
                        정말 취소 하시겠습니까?
                      </span>
                    </AlertModal>
                  </>
                ) : (
                  <>
                    {isAuth ? (
                      <Link
                        href={`/application/submit/${steadyDetailsData.id}`}
                      >
                        <Button
                          className={`${buttonSize.sm} bg-st-primary text-14 text-st-white`}
                        >
                          신청하기
                        </Button>
                      </Link>
                    ) : (
                      <AlertModal
                        actionButton={
                          <LoginModal
                            trigger={
                              <Button
                                className={cn(
                                  `bg-st-primary ${buttonSize.sm} items-center justify-center text-st-white`,
                                )}
                              >
                                로그인
                              </Button>
                            }
                          />
                        }
                        trigger={
                          <Button
                            className={`${buttonSize.sm} bg-st-primary text-st-white`}
                          >
                            신청
                          </Button>
                        }
                      >
                        <div className="text-center text-18 font-bold">
                          로그인이 필요한 기능입니다! <br />
                          로그인 하시겠어요?
                        </div>
                      </AlertModal>
                    )}
                  </>
                )}
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default SteadyDetailPage;
