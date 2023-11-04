"use client";

import Image from "next/image";
import SteadyTurtle from "@/images/steadyturtle.png";
import { cn } from "@/lib/utils";
import { subMyPageTextStyles } from "@/constants/commonStyle";

const UserCards = [
  {
    stickerLabel: "👍",
    count: 2,
  },
  {
    stickerLabel: "🔥",
    count: 0,
  },
  {
    stickerLabel: "📖",
    count: 1,
  },
  {
    stickerLabel: "📢",
    count: 3,
  },
  {
    stickerLabel: "♥️",
    count: 5,
  },
];

const Review = [
  {
    nickname: "aaa1",
    comment: "스터디에 적극적으로 참여했습니다.",
  },
  {
    nickname: "aaa2",
    comment: "스터디에 적극적으로 참여했습니다.",
  },
  {
    nickname: "aaa3",
    comment: "스터디에 적극적으로 참여했습니다.",
  },
  {
    nickname: "aaa1",
    comment: "스터디에 적극적으로 참여했습니다.",
  },
  {
    nickname: "aaa2",
    comment: "스터디에 적극적으로 참여했습니다.",
  },
  {
    nickname: "aaa3",
    comment: "스터디에 적극적으로 참여했습니다.",
  },
];

// TODO: 무한스크롤 구현, 프로필 클릭시 유저 모달, 아이콘 임시
const MyReviewsPage = () => {
  return (
    <div className="flex h-full flex-col gap-100">
      <div className="text-30 font-bold">내가 받은 리뷰</div>
      <div className={cn("flex flex-col gap-30")}>
        <div className={cn(subMyPageTextStyles.title)}>받은 카드</div>
        <div
          className={cn(
            "flex h-116 w-718 items-center justify-evenly rounded-6 border-2 border-st-gray-100 px-30 py-20",
          )}
        >
          {UserCards.map((card, id) => (
            <div
              key={id}
              className={cn(
                subMyPageTextStyles.content,
                "flex h-full w-full items-center justify-center gap-5",
              )}
            >
              <div className="h-fit w-fit text-40">{card.stickerLabel}</div>
              <div
                className={cn(subMyPageTextStyles.content)}
              >{`(${card.count})`}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={cn("flex flex-col gap-30")}>
        <div className={cn(subMyPageTextStyles.title)}>한 줄 평</div>
        {Review.map((review, id) => (
          <div
            key={id}
            className={cn(
              "flex h-95 w-718 items-center gap-20 rounded-6 border-2 border-st-gray-100 px-30",
            )}
          >
            <div className="flex flex-col items-center justify-center">
              <Image
                src={SteadyTurtle}
                alt="유저 프로필"
                width={50}
                height={50}
              />
              <div>{review.nickname}</div>
            </div>
            <div className={cn(subMyPageTextStyles.content)}>
              {review.comment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviewsPage;
