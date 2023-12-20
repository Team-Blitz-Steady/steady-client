"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import getApplicationDetails from "@/services/application/getApplicationDetails";
import ApplicantButtons from "@/components/containers/applicant/ApplicantButtons";
import { Question } from "@/components/containers/application";
import { getApplicationDetailsKey } from "@/constants/queryKeys";

const UserApplicantPage = ({
  params,
}: {
  params: { steady_id: string; application_id: string };
}) => {
  const applicationId = params.application_id;
  const steadyId = params.steady_id;

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
        <ApplicantButtons
          applicationId={applicationId}
          steadyId={steadyId}
        />
      </div>
    </div>
  );
};

export default UserApplicantPage;
