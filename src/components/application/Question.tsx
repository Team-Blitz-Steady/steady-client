import type { PropsWithChildren } from "react";

interface ApplicationQuestionProps {
  questions: {
    question: string;
  }[];
}

const Question = ({
  questions,
  children,
}: PropsWithChildren<ApplicationQuestionProps>) => {
  return (
    <>
      {questions.map(({ question }, id) => (
        <div
          key={id}
          className="flex w-full flex-col gap-15 break-all"
        >
          <div className="flex gap-10 text-20 font-bold">
            <div className="min-w-fit">질문 {id + 1}.</div>
            {question}
          </div>
          {children}
        </div>
      ))}
    </>
  );
};

export default Question;
