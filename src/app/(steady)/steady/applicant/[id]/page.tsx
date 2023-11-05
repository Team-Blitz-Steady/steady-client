"use client";

import { Question } from "@/components/application";
import { Application } from "@/app/(steady)/(application)/application/edit/[id]/page";

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
