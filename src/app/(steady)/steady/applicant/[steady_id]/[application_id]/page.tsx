"use client";

import { Question } from "@/components/application";
import { useSuspenseQuery } from "@tanstack/react-query";
import getApplicationDetails from "@/services/application/getApplicationDetails";
import Button, { buttonSize } from "@/components/_common/Button";
import { AlertModal } from "@/components/_common/Modal";
import { useManageApplicant } from "@/components/containers/applicant/hooks/useManageApplicant";
import { getApplicationDetailsKey } from "@/constants/queryKeys";

const UserApplicantPage = ({
  params,
}: {
  params: { steady_id: string; application_id: string };
}) => {
  const applicationId = params.application_id;
  const steadyId = params.steady_id;
  const { handleClickAccept, handleClickReject } = useManageApplicant({
    applicationId,
    steadyId,
  });
  const { data: applicationDetailsData } = useSuspenseQuery({
    queryKey: getApplicationDetailsKey(applicationId),
    queryFn: () => getApplicationDetails(applicationId),
  });

  return (
    <div className="flex w-full flex-col gap-10 overflow-y-scroll pr-30">
      {applicationDetailsData.surveys.map((survey, id) => (
        <Question
          key={id}
          question={survey.question}
          index={id}
        >
          <div className="h-100 w-full border-1 border-st-gray-100">
            {survey.answer}
          </div>
        </Question>
      ))}
      <div className="mt-auto flex justify-end gap-20">
        <AlertModal
          trigger={
            <Button className={`${buttonSize.sm} bg-st-red text-st-white`}>
              거절
            </Button>
          }
          actionButton={
            <Button
              className={`${buttonSize.sm} bg-st-red text-st-white`}
              onClick={handleClickReject}
            >
              거절
            </Button>
          }
        >
          <div className="text-18 font-bold">거절 하시겠습니까?</div>
        </AlertModal>
        <AlertModal
          trigger={
            <Button className={`${buttonSize.sm} bg-st-green text-st-white`}>
              승인
            </Button>
          }
          actionButton={
            <Button
              className={`${buttonSize.sm} bg-st-green text-st-white`}
              onClick={handleClickAccept}
            >
              승인
            </Button>
          }
        >
          <div className="text-18 font-bold">승인 하시겠습니까?</div>
        </AlertModal>
      </div>
    </div>
  );
};
export default UserApplicantPage;
