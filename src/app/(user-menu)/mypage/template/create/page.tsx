"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { createTemplate } from "@/services/template/createTemplate";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";

const CreateTemplatePage = () => {
  const [question, setQuestion] = useState([{ id: 1, value: "" }]);
  const [content, setContent] = useState("");
  const [count, setCount] = useState(2);
  const { toast } = useToast();
  const router = useRouter();

  const validateQuestion = (content: string) => {
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

  const handlePostTemplate = () => {
    const json = {
      title: "넥터디 템플릿",
      questions: question.map((item) => item.value),
    };
    createTemplate(json);
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

  return (
    <div className="flex gap-30">
      <div>
        <div className="flex justify-between p-20 text-30 font-bold">
          신청서 템플릿 생성
          <Button
            className={`${buttonSize.lg} bg-st-primary text-st-white`}
            onClick={() => validateQuestion(content)}
          >
            질문 추가
          </Button>
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="h-750 w-750 overflow-y-scroll">
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
                  className="h-50 w-5/6 text-20 text-st-gray-200 outline-none"
                  onChange={(e) => handleInputChange(e, item.id)}
                />
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
              </div>
            ))}
          </div>
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="mt-20 flex w-full justify-end">
          <Button
            onClick={() => handlePostTemplate}
            className={`${buttonSize.lg} bg-st-primary text-st-white`}
          >
            생성하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplatePage;
