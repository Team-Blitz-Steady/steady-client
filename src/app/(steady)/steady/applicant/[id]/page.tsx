"use client";

import { Question } from "@/components/application";
import { useQuery } from "@tanstack/react-query";
import getApplicationDetails from "@/services/application/getApplicationDetails";

const ApplicantPage = () => {
  // TODO: 12를 applicationId로 변경해야 함
  const { data: applicationDetailsData } = useQuery({
    queryKey: ["applicationDetails"],
    queryFn: () => getApplicationDetails("12"),
  });

  return (
    <div className="flex w-full flex-col gap-10">
      {applicationDetailsData?.surveys.map(({ question, answer }, id) => (
        <Question
          key={id}
          question={question}
          index={id}
        >
          <div className="h-100 w-full border-1 border-st-gray-100">
            {answer}
          </div>
        </Question>
      ))}
    </div>
  );
};
export default ApplicantPage;
