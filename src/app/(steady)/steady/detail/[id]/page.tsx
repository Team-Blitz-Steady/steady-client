"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Separator, TextArea } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import { AlertModal, UserModal } from "@/components/_common/Modal";
import Tag from "@/components/_common/Tag";

const User = {
  id: "11", // 유저 id
  profileImageUrl:
    "https://i.namu.wiki/i/w1bnPZXZOfmkgB1n2_1rQOIUhn-QAh4sNhDnLFAvlzmn7fSkV_XZMw-VFnG0ERPfifY9I0i54bQOMgHbPNBoyg.webp", // 프로필 이미지
  nickname: "oort", // 닉네임
  bio: "안녕하세요 전 윤하입니다", // 한 줄 소개
  techInfo: ["react", "next", "typescript"], // 유저의 현재 관심 스택 정보
  position: ["fe", "be"], // 유저의 현재 포지션 정보
  //"formList": 유저가 작성한 폼 리스트
  createdAt: "2023.10.29", // User 생성일
};

const SteadyPrimitive = {
  id: "2", // 스테디 id,
  masterId: "11", // 스테디 만든사람 id
  title: "스테디를 만들자", // 스테디 제목
  content: "스테디 모집합니다~", // 스테디 내용
  type: "스터디", // 스테디 유형(스터디, 프로젝트)
  createdAt: "2023.10.29", // 스테디 생성일(yyyy.mm.dd)
  status: "모집", // 스테디 상태(모집/마감)
  memberList: ["1", "3", "5", "7"], // 스테디에 참여한 유저id 목록
  ended: true,
  application: false, // 신청여부
};

const Announcement = {
  title: "프론트 3명 구해요",
  content: "프론트 같이 공부할 사람 구해요",
  deadline: "2023.11.11", // 모집글 마감일
  tags: ["프론트엔드", "리액트", "넥스트"], // 해쉬태그
  createdAt: "2023.10.29", // 모집글 생성일
  viewersNumber: 135, // 조회수
  commentsNumber: 0, // 댓글 수
  position: "프론트엔드", // 모집 분야
  mode: "온라인", // 진행 방식(온/오프라인)
  techStacks: [
    {
      id: "44",
      name: "next", // techStackName
      createdAt: Date, // Form 생성일
    },
    {
      id: "55",
      name: "react", // techStackName
      createdAt: Date, // Form 생성일
    },
  ], // 기술스택
  period: 3, // 예상기간
  renewalTimes: 2, // 끌어올리기 남은 횟수
};
interface PageParams {
  id: string;
}

const SteadyDetailPage = ({ params }: { params: PageParams }) => {
  const { data: steadyDetailsData } = useQuery({
    queryKey: ["steadyDetails"],
    queryFn: () => getSteadyDetails(params.id),
  });
  const router = useRouter();
  console.log(params);
  return (
    <div className="w-full">
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
            {steadyDetailsData && <Tag status={steadyDetailsData.status} />}
            <div className="text-35 font-bold">{Announcement.title}</div>
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
        {/* 유저 프로필 */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-20">
            <UserModal
              trigger={
                <div className="flex gap-10">
                  <Avatar
                    src={User.profileImageUrl}
                    alt="작성자 프로필"
                    size={"4"}
                    radius="full"
                    className="cursor-pointer"
                    fallback={"loading"}
                  />
                  <button className="text-20 font-bold">{User.nickname}</button>
                </div>
              }
            >
              <div>{User.profileImageUrl}</div>
              <div>{User.nickname}</div>
              <div>{User.bio}</div>
              <div>{User.techInfo}</div>
            </UserModal>
            <div className="text-16 font-bold text-st-gray-100">
              {SteadyPrimitive.createdAt}
            </div>
          </div>
          {SteadyPrimitive.ended ? (
            <Button className={`${buttonSize.md} bg-st-primary text-st-white`}>
              <Link href={`/steady/review/${SteadyPrimitive.id}`}>
                리뷰 남기기
              </Link>
            </Button>
          ) : null}
        </div>
        {/*  */}
        <Separator className="mb-20 h-5 w-auto bg-st-gray-400" />
      </div>
      {/*  */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-10">
            {Announcement.tags.map((tag, id) => (
              <div
                key={id}
                className="text-15 font-bold"
              >{`#${tag}`}</div>
            ))}
          </div>

          {/* 갱신 하기 누르면 숫자 감소 */}
          {SteadyPrimitive.masterId === User.id ? (
            <div className="flex flex-row gap-10">
              <AlertModal
                trigger={
                  <button className="text-16 font-bold text-st-gray-100">
                    최신글로 등록하기
                  </button>
                }
                actionButton={
                  <Button
                    className={`${buttonSize.sm} bg-st-green text-st-white`}
                  >
                    등록
                  </Button>
                }
              >
                <div className="flex flex-col items-center justify-center gap-10 text-16 font-bold">
                  현재 최신글로 등록할 수 있는 남은 횟수
                  <span className=" text-20 text-st-green">
                    {Announcement.renewalTimes}
                  </span>
                  등록하시겠습니까?
                </div>
              </AlertModal>
              {/*  */}
              <Link href={`/steady/config/${SteadyPrimitive.id}`}>
                <Icon
                  name="gear"
                  size={25}
                  color="text-st-gray-200"
                />
              </Link>
            </div>
          ) : null}
        </div>
        <div className="flex items-center text-16 font-bold">
          {SteadyPrimitive.type === "스터디" ? "📖 스터디" : "🗂️ 프로젝트"}
        </div>
        <div className="text-35 font-bold ">{SteadyPrimitive.title}</div>
        <div className="mb-10">
          {/* TODO: 신청서 보기, 참여자 목록 보기 */}
          <button className="mr-10 text-15 font-bold text-st-red">
            신청서 보기
          </button>
          <button className="text-15 font-bold text-st-gray-250">
            참여자 목록 보기
          </button>
        </div>
        <div className="text-20 font-bold">{SteadyPrimitive.content}</div>
      </div>
      <div className="my-30 flex flex-col gap-20">
        <Separator className="h-2 w-auto bg-st-gray-100" />
        <div className="px-50">
          <div className="mb-10 flex h-fit flex-row items-center justify-between text-18 font-bold">
            <div>모집 분야: {Announcement.position}</div>
            <div>진행 방식: {Announcement.mode}</div>
            <div>예상 기간: {Announcement.period}</div>
            <div>마감일: {Announcement.deadline}</div>
          </div>
          <div className="flex h-fit flex-row items-center text-18 font-bold">
            기술 스택:{" "}
            {Announcement.techStacks.map((tech) => tech.name).join(" ")}
          </div>
        </div>
        <Separator className="h-2 w-auto bg-st-gray-100" />
      </div>
      <div className="text-15">{Announcement.content}</div>
      <div className="flex flex-col gap-20">
        <Separator className="mt-20 h-5 w-auto bg-st-gray-400" />
        <div className="flex flex-row items-center justify-end gap-10">
          {/* TODO: steadyId로 변경 */}
          <Link href={`/application/submit/${20}`}>
            <Button className={`${buttonSize.sm} bg-st-primary text-st-white`}>
              신청
            </Button>
          </Link>
          {/* {SteadyPrimitive.application ? (
            <Button className={`${buttonSize.sm} bg-st-primary text-st-white`}>
              신청
            </Button>
          ) : (
            <>
              <Button
                className={`${buttonSize.sm} bg-st-primary  text-st-white`}
              >
                신청서 수정
              </Button>
              <Button className={`${buttonSize.sm} bg-st-red text-st-white`}>
                신청 취소
              </Button>
            </>
          )} */}
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
