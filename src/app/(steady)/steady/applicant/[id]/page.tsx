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
    {
      question: "당신은 언제 언제 나오나요?",
      answer: "일주일다",
    },
    {
      question: "당신이 가장 잘하는 분야는?",
      answer: "리액트, 넥스트, 타입스크립트",
    },
    {
      question: "당신은 부지런한가요?",
      answer: "넵",
    },
    {
      question: "힘든 스터디일 수도 있습니다 버틸 수 있나요요?",
      answer: "아니요",
    },
    {
      question: "당신은 올빼미인가요? 종달새 인가요?",
      answer: "둘당요",
    },
    {
      question: "당신의 MBTI는?",
      answer: "mbti",
    },
    {
      question:
        "세상에서 가장 긴 글을 작성하고 싶습니다 글자수를 제한해야 하지 않을까요?spspspspsfasfhasjkfhasfh",
      answer:
        "세상에서 가장 기느 답변을 작성하고 싶습니다 ㅇ로머롬너ㅏ롬너ㅗㄹ마ㅓ놀머ㅏ로어ㅏ로ㅓ암노러ㅏㅇㅁ로ㅓㅏㄴㅁ로ㅓㅏㄴ로ㅓㅁ나ㅗㄻ너ㅏ로ㅓㅏㄴ롬ㄴ롤",
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
