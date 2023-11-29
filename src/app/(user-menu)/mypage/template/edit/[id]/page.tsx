"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import deleteTemplate from "@/services/template/deleteTemplate";
import getTemplateDetail from "@/services/template/getTemplateDetail";
import updateTemplate from "@/services/template/updateTemplate";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import InputModal from "@/components/_common/Modal/InputModal";
import { getTemplateDetailsKey } from "@/constants/queryKeys";

interface QuestionType {
  id: number;
  value: string;
}

const EditTemplatePage = () => {
  const [question, setQuestion] = useState<QuestionType[]>([]);
  const [count, setCount] = useState(1);
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const templateId = pathname.split("/")[4];
  const [isModify, setIsModify] = useState(false);
  const router = useRouter();

  const { data } = useQuery({
    queryKey: getTemplateDetailsKey(templateId),
    queryFn: () => getTemplateDetail(templateId),
  });

  useEffect(() => {
    if (data) {
      setCount(data.questions.length + 1);
      setQuestion(
        data.questions.map((item, index) => ({ id: index, value: item })),
      );
    }
  }, [data]);

  const handleAddQuestion = (content: string) => {
    if (content === "") {
      toast({
        description: "질문은 1번에 1개씩 입력해주세요.",
        variant: "red",
      });
      return;
    } else {
      setContent("");
      addQuestion();
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      id: count,
      value: "",
    };
    setQuestion((prev) => [...prev, newQuestion]);
    setCount(count + 1);
  };

  const removeQuestion = (id: number) => {
    setCount(count - 1);
    setQuestion((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePostTemplate = (title: string) => {
    const json = {
      title: title,
      questions: question.map((item) => item.value),
    };
    updateTemplate(data?.id.toString() as string, json);
    router.push("/mypage/template");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    setContent(event.target.value);
    const updatedQuestions = question.map((question) => {
      if (question.id === id) {
        return { ...question, value: event.target.value };
      }
      return question;
    });
    setQuestion(updatedQuestions);
  };

  const handleDeleteTemplate = (id: string) => {
    deleteTemplate(id);
    router.push("/mypage/template");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const backToTemplate = () => {
    router.push("/mypage/template");
  };

  return (
    <div className="flex gap-30 max-sm:w-400 sm:w-500 md:w-400 lg:w-600 xl:w-750">
      <div className="w-full">
        <div className="flex justify-between px-20 pb-10 text-25 font-bold lg:text-28 xl:text-30">
          {data?.title} 템플릿
          {isModify ? (
            <div className="flex justify-center gap-20">
              <Button
                className={`${buttonSize.lg} bg-st-red text-st-white`}
                onClick={() => handleDeleteTemplate(templateId)}
              >
                템플릿 삭제
              </Button>
              <Button
                className={`${buttonSize.lg} bg-st-primary text-st-white`}
                onClick={() => handleAddQuestion(content)}
              >
                질문 추가
              </Button>
            </div>
          ) : (
            <Button
              className={`${buttonSize.sm} bg-st-primary text-st-white`}
              onClick={() => setIsModify(!isModify)}
            >
              수정하기
            </Button>
          )}
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="h-650 w-full overflow-x-hidden overflow-y-scroll">
          <div className="flex flex-col gap-20 p-20">
            {question.map((item, index) => (
              <div
                key={index}
                className="flex h-70 w-full items-center gap-30 rounded-10 p-10 shadow-lg"
              >
                <div className="h-60 w-10 rounded-full bg-st-skyblue-50"></div>
                <input
                  type="text"
                  placeholder="질문을 입력해 주세요."
                  value={item.value}
                  disabled={!isModify}
                  onChange={(event) => handleInputChange(event, item.id)}
                  className="h-50 w-5/6 bg-st-white text-20 text-st-black outline-none"
                />
                {isModify && (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (count === 2) {
                        toast({
                          description: "질문은 최소 1개 이상이어야 합니다.",
                          variant: "red",
                        });
                      } else {
                        removeQuestion(item.id);
                      }
                    }}
                  >
                    <Icon
                      name="cross"
                      size={20}
                      color=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="mt-20 flex w-full justify-end gap-20">
          {isModify && (
            <>
              <Button
                onClick={() => backToTemplate()}
                className={`${buttonSize.lg} bg-st-red text-st-white`}
              >
                취소하기
              </Button>
              <Button
                onClick={() => openModal()}
                className={`${buttonSize.lg} bg-st-primary text-st-white`}
              >
                수정완료
              </Button>
            </>
          )}
          <InputModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={handlePostTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default EditTemplatePage;
