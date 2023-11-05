"use client";

import { Question } from "@/components/application";

const Application = {
  id: "2", // 신청서 ID
  item: [
    {
      question: "당신의 이름은?",
      answer: "지윤",
    },
    {
      question: "당신의 나이는?",
      answer: "14",
    },
    {
      question: "당신의 성별은?",
      answer: "여",
    },
  ],
};

const ApplicantPage = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      {Application.item.map((item, id) => (
        <Question
          key={id}
          question={item.question}
          index={id}
        >
          <div className="h-100 w-full border-1 border-st-gray-100">
            {item.answer}
          </div>
        </Question>
      ))}
    </div>
  );
};

export default ApplicantPage;
