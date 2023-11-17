"use client";

import type { QueryKey } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import type { ApplicationsListType } from "@/services/types";

const SteadyApplicantPage = ({ params }: { params: { steady_id: string } }) => {
  const steadyId = params.steady_id;
  const queryClient = useQueryClient();
  const previousApplicants = queryClient.getQueryData<
    ApplicationsListType,
    QueryKey,
    ApplicationsListType
  >(["applicationsList", steadyId]);
  return (
    <div className="flex w-full items-center justify-center">
      <span className="text-25 font-bold">
        {previousApplicants?.numberOfElements !== 0 ? (
          <>
            <span className="text-28 text-st-primary">
              {previousApplicants?.numberOfElements}
            </span>
            명의 신청자가 스테디 참여를 기다리고 있어요!
          </>
        ) : (
          "아직 스테디에 참여한 신청자가 없어요!"
        )}
      </span>
    </div>
  );
};

export default SteadyApplicantPage;
