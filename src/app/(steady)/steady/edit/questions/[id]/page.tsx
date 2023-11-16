"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import getSteadyQuestions from "@/services/steady/getSteadyQuestions";
import updateSteadyQuestions from "@/services/steady/updateSteadyQuestions";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import { SingleSelector } from "@/components/_common/Selector";

const EditQuestionsPage = ({ params }: { params: { id: string } }) => {
  const { data: questionsData, error } = useSuspenseQuery({
    queryKey: ["questions"],
    queryFn: () => getSteadyQuestions(params.id),
  });

  const [question, setQuestion] = useState<
    { question: string; sequence: number }[]
  >([]);

  useEffect(() => {
    if (questionsData) {
      setQuestion(
        questionsData.steadyQuestions.map((item) => ({
          question: item.content,
          sequence: item.sequence,
        })),
      );
    }
  }, []);
  const { toast } = useToast();
  const router = useRouter();

  if (error) {
    return (
      <div>
        <h1>에러가 발생했습니다.</h1>
      </div>
    );
  }

  const handleAddQuestion = () => {
    setQuestion((prev) => {
      const newQuestion = [...prev];
      newQuestion.push({
        question: "",
        sequence: prev[prev.length - 1].sequence + 1,
      });
      return newQuestion;
    });
  };

  const handleInputQuestion = (
    event: ChangeEvent<HTMLInputElement>,
    questionId: number,
  ) => {
    const newQuestion = [...question];
    const index = question.findIndex((item) => item.sequence === questionId);
    newQuestion[index].question = event.target.value;
    setQuestion(newQuestion);
  };

  const handleSubmitQuestion = () => {
    const questionData = question.map((item) => item.question);
    updateSteadyQuestions(params.id, questionData).then((res) => {
      if (res.status === 204) {
        toast({
          description: "질문이 수정되었습니다.",
          variant: "green",
        });
        router.push(`/steady/detail/${params.id}/`);
      } else {
        toast({
          description: "질문 수정에 실패했습니다.",
          variant: "red",
        });
      }
    });
  };

  const handleDeleteQuestion = (sequence: number) => {
    if (question.length === 1) {
      toast({
        description: "질문은 최소 1개 이상이어야 합니다.",
        variant: "red",
      });
      return;
    }
    setQuestion((prev) => prev.filter((item) => item.sequence !== sequence));
  };

  return (
    <div className={cn("mt-30")}>
      <div className={"flex w-1000 items-center justify-between"}>
        <h1 className={"text-36 font-bold"}>스테디 신청서 질문</h1>
        <div className={"flex items-center gap-10"}>
          <SingleSelector
            className={cn("h-40 w-260")}
            items={[]}
            initialLabel={"신청서"}
          />
          <Button
            className={cn(
              `h-40 w-130 items-center justify-center bg-st-primary text-st-white`,
            )}
            onClick={() => {
              handleAddQuestion();
            }}
          >
            질문 추가
          </Button>
        </div>
      </div>
      <Separator
        my={"3"}
        size={"4"}
        className={cn("h-5 bg-st-gray-400")}
      />
      <div className={cn("flex w-1000 items-end justify-end gap-10")}>
        <ScrollArea className={cn("h-600 whitespace-nowrap")}>
          <div className={cn("flex w-full flex-col gap-20 p-20")}>
            {question.map((item) => (
              <div
                key={item.sequence}
                className={cn(
                  "z-10 flex h-70 items-center justify-center gap-30 rounded-10 p-10 shadow-lg",
                )}
              >
                <div
                  className={cn("h-60 w-10 rounded-full bg-st-skyblue-300")}
                ></div>
                <input
                  type="text"
                  placeholder="질문을 입력해 주세요."
                  value={item.question}
                  className={cn(
                    `h-50 min-w-[300px] text-20 font-semibold text-st-black outline-none`,
                  )}
                  onChange={(event) => {
                    handleInputQuestion(event, item.sequence);
                  }}
                />
                <div
                  className={cn("cursor-pointer")}
                  onClick={() => {
                    handleDeleteQuestion(item.sequence);
                  }}
                >
                  <Icon
                    name={"cross"}
                    size={20}
                    color={""}
                  />
                </div>
              </div>
            ))}
          </div>
          <ScrollBar className={cn("hidden")} />
        </ScrollArea>
        <div className={cn("flex w-1/4 justify-end")}>
          <Button
            className={cn(
              `${buttonSize.sm} items-center justify-center bg-st-primary text-st-white`,
            )}
          >
            저장
          </Button>
        </div>
      </div>
      <Separator
        size={"4"}
        my={"3"}
        className={cn("h-5 bg-st-gray-400")}
      />
      <div className={"flex justify-end gap-20"}>
        <Button className={cn(`${buttonSize.sm} items-center justify-center`)}>
          취소
        </Button>
        <Button
          className={cn(
            `bg-st-primary ${buttonSize.sm} items-center justify-center text-st-white`,
          )}
          onClick={handleSubmitQuestion}
        >
          수정
        </Button>
      </div>
    </div>
  );
};

export default EditQuestionsPage;
