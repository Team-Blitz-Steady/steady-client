"use client";

import { useRouter } from "next/navigation";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import changeApplicationStatus from "@/services/application/changeApplicationStatus";
import getApplicationDetails from "@/services/application/getApplicationDetails";
import Button, { buttonSize } from "@/components/_common/Button";
import { AlertModal } from "@/components/_common/Modal";
import { Question } from "@/components/containers/application";
import {
  getApplicantListKey,
  getApplicationDetailsKey,
} from "@/constants/queryKeys";

const UserApplicantPage = ({
  params,
}: {
  params: { steady_id: string; application_id: string };
}) => {
  const applicationId = params.application_id;
  const steadyId = params.steady_id;
  const queryClient = useQueryClient();
  const { data: applicationDetailsData } = useSuspenseQuery({
    queryKey: getApplicationDetailsKey(applicationId),
    queryFn: () => getApplicationDetails(applicationId),
  });
  const router = useRouter();

  const handleClickAccept = async () => {
    await changeApplicationStatus(applicationId, {
      status: "ACCEPTED",
    });
    await queryClient.invalidateQueries({
      queryKey: getApplicantListKey(steadyId),
    });
    router.replace(`/steady/applicant/${steadyId}`);
  };

  const handleClickReject = async () => {
    await changeApplicationStatus(applicationId, {
      status: "REJECTED",
    });
    await queryClient.invalidateQueries({
      queryKey: getApplicantListKey(steadyId),
    });
    router.replace(`/steady/applicant/${steadyId}`);
  };

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
