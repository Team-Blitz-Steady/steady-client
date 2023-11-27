"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import useCreateSteadyStore from "@/stores/createSteadyData";
import { Separator } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Command } from "cmdk";
import createSteady from "@/services/steady/createSteady";
import { createTemplate } from "@/services/template/createTemplate";
import getTemplateDetail from "@/services/template/getTemplateDetail";
import getTemplates from "@/services/template/getTemplates";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import InputModal from "@/components/_common/Modal/InputModal";
import { SingleSelector } from "@/components/_common/Selector";
import { TemplatesKey } from "@/constants/queryKeys";
import { BASIC_QUESTION, BASIC_TEMPLATE } from "@/constants/selectorItems";

const CreateQuestionsPage = () => {
  const [question, setQuestion] = useState([{ id: 1, question: "" }]);
  const [isTemplateTitleSetting, setIsTemplateTitleSetting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { steadyState } = useCreateSteadyStore();

  useEffect(() => {
    if (!steadyState || Object.keys(steadyState).length === 0) {
      toast({
        description: "스테디 신청서를 먼저 작성해 주세요.",
        variant: "red",
      });
      router.push("/steady/create");
    }
  }, [router, steadyState, toast]);

  useEffect(() => {
    const curInput = question.reduce((prev, cur) => {
      return cur.id > prev.id ? cur : prev;
    });
    document.getElementById(`question-${curInput.id}`)?.focus();
  }, [question.length]);

  const {
    data: templatesData,
    error: templatesError,
    refetch: refetchTemplates,
  } = useSuspenseQuery({
    queryKey: TemplatesKey,
    queryFn: () => getTemplates(),
  });

  if (templatesError) {
    return (
      <div>
        <h1>템플릿 목록을 불러오는 중에 에러가 발생했습니다. </h1>
      </div>
    );
  }

  const handleAddQuestion = () => {
    if (question.length === 10) {
      toast({
        description: "질문은 최대 10개까지만 추가할 수 있습니다.",
        variant: "red",
      });
      return;
    }
    setQuestion((prev) => [
      ...prev,
      { id: prev[prev.length - 1].id + 1, question: "" },
    ]);
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

  const handleSubmitTotalData = () => {
    const questions = question.map((item) => item.question);
    if (questions.some((item) => item.length === 0)) {
      toast({
        description: "질문의 내용을 입력해주세요.",
        variant: "red",
      });
      return;
    }
    const totalData = { ...steadyState, questions };
    createSteady(totalData)
      .then(() => {
        toast({
          description: "스테디가 성공적으로 등록되었습니다.",
          variant: "green",
        });
        useCreateSteadyStore.persist.clearStorage();
        router.push("/");
      })
      .catch(() => {
        toast({
          description: "스테디 등록에 실패하였습니다.",
          variant: "red",
        });
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

  const handleSelectTemplate = (id: string) => {
    if (id === "0") {
      setQuestion(BASIC_QUESTION);
      return;
    }
    getTemplateDetail(id).then((res) => {
      setQuestion(
        res.questions.map((content, index) => ({
          id: index + 1,
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
      <div className={"flex w-1000 items-center justify-between"}>
        <h1 className={"text-36 font-bold"}>스테디 신청서 질문 등록</h1>
        <div className={"flex items-center gap-10"}>
          <SingleSelector
            className={cn("h-40 w-260")}
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
                <Command onKeyDown={handleKeyDown}>
                  <input
                    id={`question-${item.id}`}
                    type="text"
                    placeholder="질문을 입력해 주세요."
                    value={item.question}
                    className={cn(
                      "h-50 w-300 text-20 font-semibold text-st-black outline-none",
                    )}
                    onChange={(event) => {
                      setQuestion((prev) =>
                        prev.map((pItem) => {
                          if (pItem.id === item.id) {
                            return {
                              ...pItem,
                              question: event.target.value,
                            };
                          }
                          return pItem;
                        }),
                      );
                    }}
                  />
                </Command>
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
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          className={cn(
            `bg-st-primary ${buttonSize.sm} items-center justify-center text-st-white`,
          )}
          onClick={() => {
            handleSubmitTotalData();
          }}
        >
          등록
        </Button>
      </div>
      <InputModal
        isOpen={isTemplateTitleSetting}
        onClose={() => setIsTemplateTitleSetting(false)}
        onSave={handleSaveTemplate}
      />
    </div>
  );
};

export default CreateQuestionsPage;
