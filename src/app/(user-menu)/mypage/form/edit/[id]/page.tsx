"use client";

import { useState } from "react";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";

const FormEdit = () => {
  const [question, setQuestion] = useState([
    {
      question: "이름이 뭔가요?",
      id: 1,
    },
    {
      question: "스테디 지원 동기?",
      id: 2,
    },
    {
      question: "스테디로 얻고자하는 것은?",
      id: 3,
    },
  ]);
  const [count, setCount] = useState(4);

  const addQuestion = () => {
    setCount(count + 1);
    const newQuestion = {
      question: "",
      id: count,
    };
    setQuestion((prev) => [...prev, newQuestion]);
  };

  const removeQuestion = (id: number) => {
    setCount(count - 1);
    setQuestion((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuestion = (id: number, newValue: string) => {
    setQuestion((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, question: newValue };
        }
        return item;
      });
    });
  };

  return (
    <div className="flex gap-30">
      <div>
        <div className="flex justify-between p-20 text-30 font-bold">
          신청서 양식 생성
          <Button
            className={`${buttonSize.lg} bg-st-primary text-st-white`}
            onClick={addQuestion}
          >
            질문 추가
          </Button>
        </div>
        <div className="h-5 w-full bg-st-gray-200"></div>
        <div className="h-800 w-750 overflow-y-scroll">
          <div className="flex flex-col gap-20 p-20">
            {question.map((item) => (
              <div
                key={item.id}
                className="flex h-70 w-full items-center gap-30 rounded-10 p-10 shadow-lg"
              >
                <div className="h-60 w-10 rounded-full bg-st-skyblue-50"></div>
                <input
                  type="text"
                  placeholder="질문을 입력해 주세요."
                  value={item.question}
                  onChange={(e) => updateQuestion(item.id, e.target.value)}
                  className="h-50 w-5/6 text-20 text-st-gray-200 outline-none"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => removeQuestion(item.id)}
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
        <div className="h-5 w-full bg-st-gray-200"></div>
      </div>
    </div>
  );
};

export default FormEdit;
