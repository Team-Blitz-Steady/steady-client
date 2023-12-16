import { useState } from "react";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import changeReviewStatus from "@/services/review/changeReviewStatus";
import type { MyReviewsType } from "@/services/types";
import Icon from "@/components/_common/Icon";
import { SingleSelector } from "@/components/_common/Selector";
import { subMyPageTextStyles } from "@/constants/commonStyle";
import { MyReviewKey } from "@/constants/queryKeys";

const MyCommentReview = ({
  myReviewData,
  title,
}: {
  myReviewData: MyReviewsType;
  title: string;
}) => {
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
    <div className={cn("flex w-full flex-col gap-30")}>
      <div className={cn(subMyPageTextStyles.title)}>{title}</div>
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
  );
};

export default MyCommentReview;
