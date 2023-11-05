"use client";

import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/themes";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import { SingleSelector } from "@/components/_common/Selector";

const CreateQuestionsPage = () => {
  const [question, setQuestion] = useState([{ id: 1 }]);
  const { toast } = useToast();

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
              setQuestion((prev) => [
                ...prev,
                { id: prev[prev.length - 1].id + 1 },
              ]);
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
      <div
        className={cn(
          "flex w-1000 items-end justify-end gap-10 scrollbar-hide",
        )}
      >
        <ScrollArea className={cn("h-600 whitespace-nowrap")}>
          <div className={cn("flex flex-col gap-20 p-20")}>
            {question.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex h-70 items-center justify-center gap-30 rounded-10 p-10 shadow-lg",
                )}
              >
                <div
                  className={cn("h-60 w-10 rounded-full bg-st-skyblue-300")}
                ></div>
                <input
                  type="text"
                  placeholder="질문을 입력해 주세요."
                  className={cn(
                    "h-50 w-300 text-20 font-semibold text-st-black outline-none",
                  )}
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
          <ScrollBar />
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
        >
          등록
        </Button>
      </div>
    </div>
  );
};

export default CreateQuestionsPage;
