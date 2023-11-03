"use client";

// import { usePathname } from "next/navigation";
import { Question } from "@/components/application";
import { TextArea } from "@radix-ui/themes";
import { Application } from "../../application/edit/[id]/page";

const ApplicantPage = () => {
  // const pathname = usePathname();
  return (
    <div>
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
