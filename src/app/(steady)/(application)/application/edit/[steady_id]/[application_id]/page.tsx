"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { TextArea } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import getApplicationDetails from "@/services/application/getApplicationDetails";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import { Question, Title } from "@/components/containers/application";
import EditButtons from "@/components/containers/applicationEdit/EditButtons";
import {
  getApplicationDetailsKey,
  getSteadyDetailsKey,
} from "@/constants/queryKeys";

const ApplicationEditPage = ({
  params,
}: {
  params: { steady_id: string; application_id: string };
}) => {
  const applicationId = params.application_id;
  const steadyId = params.steady_id;
  const pathname = usePathname();
  const pageType = pathname.split("/")[2];
  const { data: applicationData } = useSuspenseQuery({
    queryKey: getApplicationDetailsKey(applicationId),
    queryFn: () => getApplicationDetails(applicationId),
  });

  const { data: steadyDetailsData } = useSuspenseQuery({
    queryKey: getSteadyDetailsKey(steadyId),
    queryFn: () => getSteadyDetails(steadyId),
    staleTime: 10000,
  });

  const [survey, setSurvey] = useState(
    applicationData.surveys.map((survey) => ({
      question: survey.question,
      answer: survey.answer,
    })),
  );

  const handleChangeAnswer = (
    event: ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const newAnswer = event.target.value;
    setSurvey((prevData) =>
      prevData.map((question, id) =>
        id === index ? { ...question, answer: newAnswer } : question,
      ),
    );
  };

  return (
    <>
      <Title
        title={steadyDetailsData ? steadyDetailsData.name : "Temp"}
        pageType={pageType}
      >
        {survey.map((item, index) => (
          <Question
            key={index}
            question={item.question}
            index={index}
          >
            <TextArea
              className="h-100 w-full"
              value={item.answer}
              onChange={(event) => {
                handleChangeAnswer(event, index);
              }}
            />
            {!item.answer.trim() && (
              <span className="text-15 text-st-red">
                {"해당 항목을 입력해주세요"}
              </span>
            )}
          </Question>
        ))}
      </Title>
      <div className="flex items-center justify-end gap-20">
        <EditButtons
          survey={survey}
          applicationId={applicationId}
          steadyId={steadyId}
        />
      </div>
    </>
  );
};

export default ApplicationEditPage;
