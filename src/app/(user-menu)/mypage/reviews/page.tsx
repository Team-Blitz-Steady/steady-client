"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import changeReviewStatus from "@/services/review/changeReviewStatus";
import getMyReviews from "@/services/review/getMyReviews";
import Icon from "@/components/_common/Icon";
import { SingleSelector } from "@/components/_common/Selector";
import { subBoxStyles, subMyPageTextStyles } from "@/constants/commonStyle";
import { MyReviewKey } from "@/constants/queryKeys";

const MyReviewsPage = () => {
  const { data: myReviewData } = useSuspenseQuery({
    queryKey: MyReviewKey,
    queryFn: () => getMyReviews(),
    staleTime: 10000,
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const selectedReviews = myReviewData.reviews.find(
    (review) => review.steadyId === Number(selectedId),
  );

  const handlePublicReview = async (reviewId: number) => {
    await changeReviewStatus(reviewId.toString());
    queryClient.invalidateQueries({ queryKey: MyReviewKey });
  };

  return (
    <div className="flex h-full flex-col gap-50 max-sm:w-400 sm:w-500 md:w-400 lg:w-600 xl:w-750">
      <div className="font-bold max-sm:text-22 sm:text-22 md:text-25 lg:text-28 xl:text-30">
        내가 받은 리뷰
      </div>
      <div className={cn("flex flex-col gap-30")}>
        <div className={cn(subMyPageTextStyles.title)}>받은 카드</div>
        <div className={cn(subBoxStyles, "justify-evenly")}>
          {myReviewData.userCards.map((card) => (
            <div
              key={card.cardId}
              className={cn(
                subMyPageTextStyles.content,
                "flex h-full flex-col items-center justify-center gap-5",
              )}
            >
              <Image
                src={card.imageUrl}
                alt="카드 이미지"
                width={40}
                height={80}
              />
              <div className={cn(subMyPageTextStyles.content)}>
                {`( ${card.count} )`}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cn("flex w-full flex-col gap-30")}>
        <div className={cn(subMyPageTextStyles.title)}>한 줄 평</div>
        <SingleSelector
          items={myReviewData.reviews.map((review) => ({
            value: review.steadyId.toString(),
            label: review.steadyName,
          }))}
          initialLabel="전체"
          onSelectedChange={(value) => setSelectedId(value)}
          className="h-60"
        />
        <div
          className={`${
            selectedReviews
              ? "border-2 border-st-gray-100"
              : "items-center justify-center"
          } flex h-230 flex-col gap-20 overflow-auto px-10 py-5`}
        >
          {selectedReviews &&
            selectedReviews.reviews.map((review) => (
              <div
                key={review.reviewId}
                className="flex items-center justify-between"
              >
                <div className="text-ellipsis text-15 font-bold">
                  {review.comment}
                </div>
                <button onClick={() => handlePublicReview(review.reviewId)}>
                  {review.isPublic ? (
                    <Icon
                      name="eye"
                      size={25}
                      color="text-black"
                    />
                  ) : (
                    <Icon
                      name="eye-none"
                      size={25}
                      color="text-black"
                    />
                  )}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyReviewsPage;
