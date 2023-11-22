"use client";

import useApplicantListQuery from "@/hooks/query/useApplicantListQuery";

const SteadyApplicantPage = ({ params }: { params: { steady_id: string } }) => {
  const steadyId = params.steady_id;
  const { applicantListData } = useApplicantListQuery({ steadyId });

  return (
    <div className="flex w-full items-center justify-center">
      <span className="text-25 font-bold">
        {applicantListData.pages.map((page) =>
          page.numberOfElements === 0 ? (
            "아직 스테디에 신청한 사람이 없어요!"
          ) : (
            <>
              <span className="text-28 text-st-primary">
                {page.numberOfElements === 10
                  ? "명 이상의 신청자가 스테디 참여를 기다리고 있어요!"
                  : "명의 신청자가 스테디 참여를 기다리고 있어요!"}
              </span>
            </>
          ),
        )}
      </span>
    </div>
  );
};

export default SteadyApplicantPage;
