"use client";

import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/themes";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import { SingleSelector } from "@/components/_common/Selector";

const QuestionsExample = [
  { id: 1, question: "희망하시는 포지션을 말씀해주세요." },
  { id: 2, question: "주로 사용하시는 기술 스택을 기입해주세요." },
  {
    id: 3,
    question: "저희는 주로 오프라인 모임을 진행합니다. 참석이 가능하신가요?",
  },
];

const EditQuestionsPage = () => {
  const [question, setQuestion] = useState(QuestionsExample);
  const { toast } = useToast();

  const handleSubmitQuestion = () => {
    const questionData = question.map((item) => item.question);
    console.log(questionData); // TODO: 추후 API 나오면 요청 함수로 변경
  };

  const handleDeleteQuestion = (id: number) => {
    if (question.length === 1) {
      toast({
        description: "질문은 최소 1개 이상이어야 합니다.",
        variant: "red",
      });
      return;
    }
    setQuestion((prev) => prev.filter((item) => item.id !== id));
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
              setQuestion((prev) => {
                const newQuestion = [...prev];
                newQuestion.push({
                  id: prev[prev.length - 1].id + 1,
                  question: "",
                });
                return newQuestion;
              });
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
                key={item.id}
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
                    const newQuestion = [...question];
                    newQuestion[item.id - 1].question = event.target.value;
                    setQuestion(newQuestion);
                  }}
                />
                <div
                  className={cn("cursor-pointer")}
                  onClick={() => {
                    handleDeleteQuestion(item.id);
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
