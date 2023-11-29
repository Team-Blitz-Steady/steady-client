"use client";

import useApplicantListQuery from "@/hooks/query/useApplicantListQuery";

const SteadyApplicantPage = ({ params }: { params: { steady_id: string } }) => {
  const steadyId = params.steady_id;
  const { applicantListData, hasNextPage } = useApplicantListQuery({
    steadyId,
  });
  const numberOfApplicant = applicantListData.pages
    .flat()
    .reduce((acc, cur) => acc + cur.numberOfElements, 0);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="font-bold max-sm:text-15 sm:text-18 md:text-20 lg:text-22 xl:text-25">
        {numberOfApplicant === 0 ? (
          "아직 스테디에 신청한 사람이 없어요!"
        ) : (
          <>
            <span className="text-st-primary max-sm:text-18 sm:text-21 md:text-23 lg:text-25 xl:text-28">
              {numberOfApplicant}
            </span>
            <span className="text-center">
              {hasNextPage
                ? "명 이상의 신청자가 스테디 참여를 기다리고 있어요!"
                : "명의 신청자가 스테디 참여를 기다리고 있어요!"}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default SteadyApplicantPage;
