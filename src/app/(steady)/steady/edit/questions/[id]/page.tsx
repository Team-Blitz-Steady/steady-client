"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Command } from "cmdk";
import getSteadyQuestions from "@/services/steady/getSteadyQuestions";
import updateSteadyQuestions from "@/services/steady/updateSteadyQuestions";
import { createTemplate } from "@/services/template/createTemplate";
import getTemplateDetail from "@/services/template/getTemplateDetail";
import getTemplates from "@/services/template/getTemplates";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import InputModal from "@/components/_common/Modal/InputModal";
import { SingleSelector } from "@/components/_common/Selector";
import { TemplatesKey, getSteadyEditQuestionsKey } from "@/constants/queryKeys";
import { BASIC_QUESTION, BASIC_TEMPLATE } from "@/constants/selectorItems";

const EditQuestionsPage = ({ params }: { params: { id: string } }) => {
  const steadyId = params.id;
  const { toast } = useToast();
  const router = useRouter();

  const {
    data: questionsData,
    error,
    refetch: refetchQuestions,
  } = useSuspenseQuery({
    queryKey: getSteadyEditQuestionsKey(steadyId),
    queryFn: () => getSteadyQuestions(steadyId),
  });

  const {
    data: templatesData,
    error: templatesError,
    refetch: refetchTemplates,
  } = useSuspenseQuery({
    queryKey: TemplatesKey,
    queryFn: () => getTemplates(),
  });

  const [question, setQuestion] = useState<
    { question: string; sequence: number }[]
  >([]);
  const [isTemplateTitleSetting, setIsTemplateTitleSetting] = useState(false);

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

  useEffect(() => {
    const curInput = question.find(
      (item) =>
        item.sequence === Math.max(...question.map((item) => item.sequence)),
    );
    document.getElementById(`question-${curInput?.sequence}`)?.focus();
  }, [question.length]);

  if (error || templatesError) {
    return (
      <div>
        <h1>정보를 불러오는 도중에 에러가 발생했습니다. </h1>
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
        refetchQuestions();
        toast({
          description: "질문이 수정되었습니다.",
          variant: "green",
        });
        router.replace(`/steady/detail/${params.id}/`);
      } else {
        toast({
          description: "질문 수정에 실패했습니다.",
          variant: "red",
        });
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (event.key === "Enter") {
      handleAddQuestion();
    }
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

  const handleSelectTemplate = (id: string) => {
    if (id === "0") {
      setQuestion(
        BASIC_QUESTION.map((item, index) => ({ ...item, sequence: index + 1 })),
      );
      return;
    }
    getTemplateDetail(id).then((res) => {
      setQuestion(
        res.questions.map((content, index) => ({
          sequence: index + 1,
          question: content,
        })),
      );
    });
  };

  const handleSaveTemplate = (title: string) => {
    const templateData = {
      title: title,
      questions: question.map((item) => item.question),
    };
    createTemplate(templateData)
      .then(() => {
        toast({
          description: "질문 템플릿이 성공적으로 저장되었습니다.",
          variant: "green",
        });
        refetchTemplates();
      })
      .catch(() => {
        toast({
          description: "질문 템플릿 저장에 실패하였습니다.",
          variant: "red",
        });
      });
  };

  return (
    <div className={cn("mt-30")}>
      <div className={"max-sm:w-400 sm:w-450 md:w-600 lg:w-800 xl:w-1000"}>
        <div className="flex w-full items-center justify-between">
          <h1
            className={
              "font-bold max-sm:text-20 sm:text-20 md:text-25 lg:text-30 xl:text-35"
            }
          >
            스테디 신청서 질문
          </h1>
          <div className={"flex items-center gap-10"}>
            <SingleSelector
              className={cn("h-40 w-260 max-sm:w-120 sm:w-150 md:w-200")}
              items={BASIC_TEMPLATE.concat(templatesData.templates).map(
                (item) => ({
                  value: item.id.toString(),
                  label: item.title,
                }),
              )}
              initialLabel={"질문 템플릿"}
              onSelectedChange={(selected) => {
                handleSelectTemplate(selected);
              }}
            />
            <Button
              className={cn(
                `h-40 w-120 items-center justify-center bg-st-primary text-st-white max-sm:w-70 sm:w-80 md:w-100`,
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
        <div className={cn("flex w-full flex-col gap-10 scrollbar-hide")}>
          <ScrollArea
            className={cn(
              "h-600 flex-col items-center justify-center whitespace-nowrap",
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-20 py-20 max-sm:px-20 sm:px-40 md:px-50 lg:px-60 xl:px-70",
              )}
            >
              {question.map((item) => (
                <div
                  key={item.sequence}
                  className={cn(
                    "z-10 flex h-70 items-center justify-between gap-30 rounded-10 p-10 shadow-lg",
                  )}
                >
                  <div className="flex gap-20">
                    <div
                      className={cn("h-60 w-10 rounded-full bg-st-skyblue-300")}
                    ></div>
                    <Command onKeyDown={handleKeyDown}>
                      <input
                        id={`question-${item.sequence}`}
                        type="text"
                        placeholder="질문을 입력해 주세요."
                        value={item.question}
                        className={cn(
                          `h-50 w-auto text-20 font-semibold text-st-black outline-none max-sm:w-250 sm:w-300 md:w-400 lg:w-600 xl:w-750`,
                        )}
                        onChange={(event) => {
                          handleInputQuestion(event, item.sequence);
                        }}
                      />
                    </Command>
                  </div>
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
          <div className={cn("flex justify-end")}>
            <Button
              className={cn(
                `${buttonSize.sm} items-center justify-center bg-st-primary text-st-white`,
              )}
              onClick={() => {
                setIsTemplateTitleSetting(true);
              }}
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
          <Button
            className={cn(`${buttonSize.sm} items-center justify-center`)}
            onClick={() => {
              router.back();
            }}
          >
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
        <InputModal
          isOpen={isTemplateTitleSetting}
          onClose={() => setIsTemplateTitleSetting(false)}
          onSave={handleSaveTemplate}
        />
      </div>
    </div>
  );
};

export default EditQuestionsPage;
