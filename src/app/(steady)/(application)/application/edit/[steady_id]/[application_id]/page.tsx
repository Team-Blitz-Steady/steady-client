"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Question, Title } from "@/components/application";
import { useToast } from "@/components/ui/use-toast";
import { TextArea } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import editApplication from "@/services/application/editApplication";
import getApplicationDetails from "@/services/application/getApplicationDetails";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import Button, { buttonSize } from "@/components/_common/Button";
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
  const router = useRouter();
  const pathname = usePathname();
  const pageType = pathname.split("/")[2];
  const { toast } = useToast();
  const { data: applicationData, refetch: applicationRefetch } =
    useSuspenseQuery({
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

  const handleClickEdit = async () => {
    const checkInvalidAnswers = survey.some((item) => !item.answer.length);
    if (checkInvalidAnswers) {
      toast({
        description: "입력되지 않은 항목이 있습니다.",
        variant: "red",
      });
    } else {
      try {
        await editApplication(applicationId, {
          answers: survey.map((item) => item.answer),
        });
        toast({
          description: "스테디 신청서 수정 성공!",
          variant: "green",
        });
        await applicationRefetch();
        router.replace(`/steady/detail/${steadyId}`);
      } catch (error) {
        toast({
          description: "스테디 신청서 수정 실패!",
          variant: "red",
        });
      }
    }
  };

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
        <Button
          className={`${buttonSize.sm} bg-st-white`}
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          onClick={handleClickEdit}
          className={`${buttonSize.sm} bg-st-primary text-st-white`}
        >
          수정 완료
        </Button>
      </div>
    </>
  );
};

export default ApplicationEditPage;
