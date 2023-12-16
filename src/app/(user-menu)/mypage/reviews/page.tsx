"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import getMyReviews from "@/services/review/getMyReviews";
import MyCardReview from "@/components/containers/myReviews/MyCardReview";
import MyCommentReview from "@/components/containers/myReviews/MyCommentReview";
import { MyReviewKey } from "@/constants/queryKeys";

const MyReviewsPage = () => {
  const { data: myReviewData } = useSuspenseQuery({
    queryKey: MyReviewKey,
    queryFn: () => getMyReviews(),
    staleTime: 10000,
  });

  return (
    <div className="flex h-full flex-col gap-50 max-sm:w-400 sm:w-500 md:w-400 lg:w-600 xl:w-750">
      <div className="font-bold max-sm:text-22 sm:text-22 md:text-25 lg:text-28 xl:text-30">
        내가 받은 리뷰
      </div>
      <MyCardReview
        title={"받은 카드"}
        myReviewData={myReviewData}
      />
      <MyCommentReview
        title={"한 줄 평"}
        myReviewData={myReviewData}
      />
    </div>
  );
};

export default MyReviewsPage;
