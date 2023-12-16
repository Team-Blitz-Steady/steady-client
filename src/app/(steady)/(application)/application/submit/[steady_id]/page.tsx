"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TextArea } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import getSteadyQuestions from "@/services/steady/getSteadyQuestions";
import { Question, Title } from "@/components/containers/application";
import SubmitButtons from "@/components/containers/applicationSubmit/SubmitButtons";
import {
  getSteadyDetailsKey,
  getSteadyQuestionsKey,
} from "@/constants/queryKeys";

const ApplicationSubmitPage = ({
  params,
}: {
  params: { steady_id: string };
}) => {
  const pathname = usePathname();
  const steadyId = params.steady_id;
  const pageType = pathname.split("/")[2];
  const router = useRouter();
  const { data: steadyQuestionsData } = useSuspenseQuery({
    queryKey: getSteadyQuestionsKey(steadyId),
    queryFn: () => getSteadyQuestions(steadyId),
    staleTime: 10000,
  });
  const [applicationData, setApplicationData] = useState(
    steadyQuestionsData.steadyQuestions.map((item) => ({
      question: item.content,
      answer: "",
    })),
  );

  const { data: steadyDetailsData } = useSuspenseQuery({
    queryKey: getSteadyDetailsKey(steadyId),
    queryFn: () => getSteadyDetails(steadyId),
    staleTime: 10000,
  });

  useEffect(() => {
    if (steadyDetailsData.applicationId !== null) {
      router.replace(`/steady/detail/${steadyId}`);
    }
  }, [steadyDetailsData.applicationId, router, steadyId]);

  const handleChangeAnswer = (
    event: ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const newAnswer = event.target.value;
    setApplicationData((prevData) =>
      prevData.map((question, id) =>
        id === index ? { ...question, answer: newAnswer } : question,
      ),
    );
  };

  return (
    <>
      <Title
        title={steadyQuestionsData.steadyName}
        pageType={pageType}
      >
        {applicationData.map((item, index) => (
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
        <SubmitButtons
          applicationData={applicationData}
          steadyId={steadyId}
        />
      </div>
    </>
  );
};

export default ApplicationSubmitPage;
