import { type PropsWithChildren } from "react";

interface ApplicationQuestionProps {
  index: number;
  question: string;
}

const Question = ({
  index,
  question,
  children,
}: PropsWithChildren<ApplicationQuestionProps>) => {
  return (
    <>
      <div className="flex w-full flex-col gap-15 break-all">
        <div className="flex gap-10 text-20 font-bold">
          <div className="min-w-fit">질문 {index + 1}.</div>
          {question}
        </div>
        {children}
      </div>
    </>
  );
};

export default Question;
