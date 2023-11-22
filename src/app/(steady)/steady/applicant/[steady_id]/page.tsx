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
      <span className="text-25 font-bold">
        {numberOfApplicant === 0 ? (
          "아직 스테디에 신청한 사람이 없어요!"
        ) : (
          <>
            <span className="text-28 text-st-primary">{numberOfApplicant}</span>
            {hasNextPage
              ? "명 이상의 신청자가 스테디 참여를 기다리고 있어요!"
              : "명의 신청자가 스테디 참여를 기다리고 있어요!"}
          </>
        )}
      </span>
    </div>
  );
};

export default SteadyApplicantPage;
