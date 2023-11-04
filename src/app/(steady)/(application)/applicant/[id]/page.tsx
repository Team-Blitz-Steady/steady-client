"use client";

import { Question } from "@/components/application";
import { TextArea } from "@radix-ui/themes";
import { Application } from "../../application/edit/[id]/page";

const ApplicantPage = () => {
  return (
    <div className="flex flex-col gap-10">
      {Application.item.map((item, id) => (
        <Question
          key={id}
          question={item.question}
          index={id}
        >
          <TextArea
            className="h-100 w-full"
            value={item.answer}
          />
        </Question>
      ))}
    </div>
  );
};

export default ApplicantPage;
