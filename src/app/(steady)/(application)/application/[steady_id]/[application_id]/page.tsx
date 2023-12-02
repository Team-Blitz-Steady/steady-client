"use client";

import { usePathname, useRouter } from "next/navigation";
import { Question, Title } from "@/components/application";
import { useSuspenseQuery } from "@tanstack/react-query";
import getApplicationDetails from "@/services/application/getApplicationDetails";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import Button, { buttonSize } from "@/components/_common/Button";
import useApplicationListQuery from "@/hooks/query/useApplicationListQuery";
import {
  getApplicationDetailsKey,
  getSteadyDetailsKey,
} from "@/constants/queryKeys";

const ApplicationPage = ({
  params,
}: {
  params: { steady_id: string; application_id: string };
}) => {
  const applicationId = params.application_id;
  const steadyId = params.steady_id;
  const pathname = usePathname();
  const pageType = pathname.split("/")[2];
  const router = useRouter();
  const { data: applicationData } = useSuspenseQuery({
    queryKey: getApplicationDetailsKey(applicationId),
    queryFn: () => getApplicationDetails(applicationId),
  });

  const { data: steadyDetailsData } = useSuspenseQuery({
    queryKey: getSteadyDetailsKey(steadyId),
    queryFn: () => getSteadyDetails(steadyId),
    staleTime: 10000,
  });

  const { applicationListData } = useApplicationListQuery();

  const application = applicationListData.pages.map(
    (page) =>
      page.content.find(
        (item) => item.applicationId.toString() === applicationId,
      )?.status,
  )[0];

  return (
    <>
      <Title
        title={steadyDetailsData ? steadyDetailsData.name : "Temp"}
        pageType={pageType}
      >
        {applicationData.surveys.map((survey, index) => (
          <Question
            key={index}
            question={survey.question}
            index={index}
          >
            <div className="h-100 w-full border-1">{survey.answer}</div>
          </Question>
        ))}
      </Title>
      {application === "WAITING" && (
        <div className="flex items-center justify-end">
          <Button
            className={`${buttonSize.sm} bg-st-primary text-st-white`}
            onClick={() =>
              router.push(`/application/edit/${steadyId}/${applicationId}`)
            }
          >
            수정 하기
          </Button>
        </div>
      )}
    </>
  );
};

export default ApplicationPage;
