"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Question, Title } from "@/components/application";
import { useToast } from "@/components/ui/use-toast";
import { TextArea } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import submitApplication from "@/services/application/submitApplication";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import getSteadyQuestions from "@/services/steady/getSteadyQuestions";
import Button, { buttonSize } from "@/components/_common/Button";
import {
  getSteadyDetailsKey,
  getSteadyQuestionsKey,
} from "@/constants/queryKeys";

interface pageParams {
  id: string;
}

const ApplicationSubmitPage = ({ params }: { params: pageParams }) => {
  const router = useRouter();
  const pathname = usePathname();
  const steadyId = params.id;
  const pageType = pathname.split("/")[2];
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
  const { toast } = useToast();

  const { data: steadyDetailsData, refetch: steadyDetailsRefetch } =
    useSuspenseQuery({
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

  const onSubmitAnswers = async () => {
    const checkInvalidAnswers = applicationData.some(
      (item) => !item.answer.length,
    );
    if (checkInvalidAnswers) {
      toast({
        description: "입력되지 않은 항목이 있습니다.",
        variant: "red",
      });
    } else {
      try {
        await submitApplication(steadyId, applicationData);
        toast({
          description: "스테디 참여 신청서 제출 성공!",
          variant: "green",
        });
        steadyDetailsRefetch();
      } catch (error) {
        toast({
          description: "스테디 참여 신청서 제출 실패!",
          variant: "red",
        });
      }
    }
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
        <Button
          className={`${buttonSize.sm} bg-st-white`}
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          onClick={onSubmitAnswers}
          className={`${buttonSize.sm} bg-st-primary text-st-white`}
        >
          제출 완료
        </Button>
      </div>
    </>
  );
};

export default ApplicationSubmitPage;
