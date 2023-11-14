"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import SteadyTurtle from "@/images/steadytext.png";
import { Avatar, Separator, TextArea } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import getSteadyParticipants from "@/services/steady/getSteadyParticipants";
import promoteSteady from "@/services/steady/promoteSteady";
import type { SteadyDetailsType } from "@/services/types";
import Button, { buttonSize } from "@/components/_common/Button";
import Dropdown from "@/components/_common/Dropdown";
import Icon from "@/components/_common/Icon";
import { AlertModal, InfoModal, UserModal } from "@/components/_common/Modal";
import Tag from "@/components/_common/Tag";
import { transformCreatedAt } from "@/utils/transformCreatedAt";
import {
  steadyCategoriesWithEmoji,
  steadyExpectedPeriods,
  steadyRecruitmentFields,
  steadyRunningMethods,
} from "@/constants/create-steady";

// {
//   "id": 1,
//   "leaderResponse": {
//     "id": 1,
//     "nickname": "weonest",
//     "profileImage": "123"
//   },
//   "name": "테스트 스테디",
//   "bio": "스테디원 모집합니다",
//   "type": "STUDY",
//   "status": "RECRUITING",
//   "participantLimit": 6,
//   "numberOfParticipants": 1,
//   "steadyMode": "ONLINE",
//   "scheduledPeriod": "ONE_WEEK",
//   "deadline": "2023-11-27",
//   "title": "스테디원 모집합니다",
//   "content": "많관부",
//   "positions": [
//     {
//       "id": 1,
//       "name": "백엔드"
//     }
//   ],
//   "stacks": [
//     {
//       "id": 1,
//       "name": "Java",
//       "imageUrl": "www"
//     }
//   ],
//   "isLeader": true,
//   "isSubmittedUser": false,
//   "promotionCount": 3
// }

// {
//   "participants": [
//     {
//       "id": 1,
//       "nickname": "weonest",
//       "profileImage": "url1",
//       "isLeader": true
//     },
//     {
//       "id": 2,
//       "nickname": "nayjk",
//       "profileImage": "url2",
//       "isLeader": false
//     }
//   ]
// }

interface PageParams {
  id: string;
}

const SteadyDetailPage = ({ params }: { params: PageParams }) => {
  const { data: steadyDetailsData, refetch: steadyDetailsRefetch } =
    useSuspenseQuery({
      queryKey: ["steadyDetails"],
      queryFn: () => getSteadyDetails(params.id),
    });
  const { data: steadyParticipantsData } = useSuspenseQuery({
    queryKey: ["steadyParticipants"],
    queryFn: () => getSteadyParticipants(params.id),
  });
  const router = useRouter();
  const { toast } = useToast();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClickPromoteBtn = async (steadyId: string) => {
    if (steadyDetailsData.promotionCount === 0) {
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

  if (!isClient) {
    return;
  }

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
          {/* TODO: 좋아요 API 연결 */}
          <button>
            <Icon
              name="heart"
              size={30}
              color="text-black"
            />
          </button>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-20">
            <UserModal
              trigger={
                <div className="flex gap-10">
                  <Avatar
                    src={
                      steadyDetailsData.leaderResponse.profileImage
                        ? steadyDetailsData.leaderResponse.profileImage
                        : `/${SteadyTurtle}`
                    }
                    alt="작성자 프로필"
                    size={"4"}
                    radius="full"
                    className="cursor-pointer"
                    fallback={""}
                  />
                  <button className="text-20 font-bold">
                    {steadyDetailsData.leaderResponse.nickname}
                  </button>
                </div>
              }
            >
              {/* TODO: 유저 정보 API 연결 */}
              {/* <div>{User.profileImageUrl}</div>
                  <div>{User.nickname}</div>
                  <div>{User.bio}</div>
                  <div>{User.techInfo}</div> */}
            </UserModal>
            <div className="flex gap-10 text-16 font-bold text-st-gray-100">
              <span>
                {transformCreatedAt(steadyDetailsData.createdAt).date}
              </span>
              <span>
                {transformCreatedAt(steadyDetailsData.createdAt).time}
              </span>
            </div>
          </div>
          <Link href={`/steady/applicant/${steadyDetailsData.id}`}>
            {/* TODO: 신청자 보기 API 연결 */}
            <Button className={`${buttonSize.md} bg-st-primary text-st-white`}>
              신청자 보기
            </Button>
          </Link>
          {steadyDetailsData.status === "FINISHED" ? (
            <Button className={`${buttonSize.md} bg-st-primary text-st-white`}>
              <Link href={`/steady/review/${steadyDetailsData.id}`}>
                리뷰 남기기
              </Link>
            </Button>
          ) : null}
        </div>
        <Separator className="mb-20 h-5 w-auto bg-st-gray-400" />
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-10">
            {/* TODO: 해시태그 API 연결 */}
            {["프론트엔드", "백엔드", "자바", "풀스택", "긴급"].map(
              (tag, id) => (
                <div
                  key={id}
                  className="text-15 font-bold"
                >{`#${tag}`}</div>
              ),
            )}
          </div>
          {steadyDetailsData.isLeader && (
            <div className="flex flex-row gap-10">
              <AlertModal
                trigger={
                  <button className="text-16 font-bold text-st-gray-100">
                    최신글로 등록하기
                  </button>
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
        <div className="flex items-center text-16 font-bold">
          {steadyCategoriesWithEmoji[steadyDetailsData.type]}
        </div>
        <div className="text-35 font-bold ">{steadyDetailsData.title}</div>
        <div className="mb-10">
          {/* TODO: 신청서 보기 API 연결 */}
          <button className="mr-10 text-15 font-bold text-st-red">
            신청서 보기
          </button>
          <InfoModal
            trigger={
              <button className="text-15 font-bold text-st-gray-250">
                참여자 목록 보기
              </button>
            }
          >
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="flex flex-col items-center justify-center gap-10">
                <Avatar
                  src={
                    steadyDetailsData.leaderResponse.profileImage
                      ? steadyDetailsData.leaderResponse.profileImage
                      : `/${SteadyTurtle}`
                  }
                  alt="참여자 이미지"
                  size={"6"}
                  radius="full"
                  className="cursor-pointer"
                  fallback={""}
                />
                <div>{steadyDetailsData.leaderResponse.nickname}</div>
              </div>
              {steadyParticipantsData.participants.map((participant, id) => (
                <div
                  key={id}
                  className="flex flex-col items-center justify-center gap-10"
                >
                  {!participant.isLeader && (
                    <>
                      <Avatar
                        src={
                          participant.profileImage
                            ? participant.profileImage
                            : `/${SteadyTurtle}`
                        }
                        alt="참여자 이미지"
                        size={"6"}
                        radius="full"
                        className="cursor-pointer"
                        fallback={""}
                      />
                      <div>{participant.nickname}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </InfoModal>
        </div>
        <div className="text-20 font-bold">{steadyDetailsData.bio}</div>
      </div>
      <div className="my-30 flex flex-col gap-20 ">
        <Separator className="h-2 w-auto bg-st-gray-100" />
        <div className="px-50">
          <div className="mb-10 flex h-fit flex-row items-center justify-between text-18 font-bold">
            <div>
              포지션:{" "}
              {steadyDetailsData.positions.map((position, id) => {
                const match = steadyRecruitmentFields.find(
                  (field) => field.value === position.id.toString(),
                );
                return match ? <div key={id}>{match.label}</div> : null;
              })}
            </div>
            <div>
              진행 방식:{" "}
              {matchingData(steadyRunningMethods, steadyDetailsData.steadyMode)}
            </div>
            <div>
              예상 기간:{" "}
              {matchingData(
                steadyExpectedPeriods,
                steadyDetailsData.scheduledPeriod,
              )}
            </div>
            <div>마감일: {steadyDetailsData.deadline}</div>
          </div>
          <div className="flex h-fit flex-row items-center text-18 font-bold">
            기술 스택:
            {steadyDetailsData.stacks.map((stack, id) => (
              <div key={id}>{stack.imageUrl}</div>
            ))}
          </div>
        </div>
        <Separator className="h-2 w-auto bg-st-gray-100" />
      </div>
      <div className="text-15">{steadyDetailsData.content}</div>
      <div className="flex flex-col gap-20">
        <Separator className="mt-20 h-5 w-auto bg-st-gray-400" />
        <div className="flex flex-row items-center justify-end gap-10">
          {!steadyDetailsData.isLeader && (
            <>
              {steadyDetailsData.isSubmittedUser ? (
                <>
                  <Link href={`/application/edit/${steadyDetailsData.id}`}>
                    <Button
                      className={`${buttonSize.sm} bg-st-primary  text-st-white`}
                    >
                      신청서 수정
                    </Button>
                  </Link>
                  {/* TODO: 신청 취소 API*/}
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
                      >
                        예
                      </Button>
                    }
                  >
                    정말 취소 하시겠습니까?
                  </AlertModal>
                </>
              ) : (
                <Link href={`/application/submit/${steadyDetailsData.id}`}>
                  <Button
                    className={`${buttonSize.sm} bg-st-primary text-st-white`}
                  >
                    신청
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
        {/* 댓글 영역 */}
        <div className="flex flex-col gap-10">
          <div className="text-15 font-bold">댓글</div>
          <TextArea className="h-150 w-full rounded-15" />
          <Button
            className={`${buttonSize.sm} ml-auto bg-st-primary text-st-white`}
          >
            등록
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SteadyDetailPage;
