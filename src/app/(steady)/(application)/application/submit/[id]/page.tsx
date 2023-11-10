"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Question, Title } from "@/components/application";
import { TextArea } from "@radix-ui/themes";
import submitApplication from "@/services/application/submitApplication";
import type { ApplicationSurveyType } from "@/services/types";
import Button, { buttonSize } from "@/components/_common/Button";

const ApplicationQuestion = {
  steadyId: "18",
  questions: [
    "당신의 이름은?",
    "당신의 나이는?",
    "당신의 성별은?",
    "당신은 언제 언제 나오나요?",
    "당신이 가장 잘하는 분야는?",
    "당신은 부지런한가요?",
    "힘든 스터디일 수도 있습니다 버틸 수 있나요요?",
    "당신은 올빼미인가요? 종달새 인가요?",
    "세상에서 가장 긴 글을 작성하고 싶습니다 글자수를 제한해야 하지 않을까요?spspspspsfasfhasjkfhasfh",
    "당신의 mbti는?",
  ],
};

interface pageParams {
  id: string;
}
// TODO: 신청서 수정 성공시 Toast 성공 알림
// TODO: react-hook-form과 ZOD로 유효성 검사

const ApplicationSubmitPage = ({ params }: { params: pageParams }) => {
  const router = useRouter();
  const pathname = usePathname();
  const steadyId = params.id;
  const pageType = pathname.split("/")[2];
  const [applicationData, setApplicationData] = useState(
    ApplicationQuestion.questions.map((question) => ({
      question,
      answer: "",
    })),
  );

  const handleChangeAnswer = (
    event: ChangeEvent<HTMLTextAreaElement>,
    id: number,
  ) => {
    const newAnswer = event.target.value;
    const updatedApplicationData = [...applicationData];
    updatedApplicationData[id].answer = newAnswer;
    setApplicationData(updatedApplicationData);
  };

  const handleClickButton = async (
    steadyId: string,
    applicationData: ApplicationSurveyType[],
  ) => {
    await submitApplication(steadyId, applicationData);
    router.push(`/steady/detail/${steadyId}`);
  };

  return (
    <>
      <Title
        title={"임스 스테디명"}
        pageType={pageType}
      >
        {applicationData.map(({ question, answer }, id) => (
          <Question
            key={id}
            question={question}
            index={id}
          >
            <TextArea
              className="h-100 w-full"
              value={answer}
              onChange={(event) => handleChangeAnswer(event, id)}
            />
          </Question>
        ))}
      </Title>
      {/* TODO: 라우터 연결 */}
      <div className="flex items-center justify-end gap-20">
        <Button
          className={`${buttonSize.sm} bg-st-white`}
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          onClick={() => handleClickButton(steadyId, applicationData)}
          className={`${buttonSize.sm} bg-st-primary text-st-white`}
        >
          제출 완료
        </Button>
      </div>
    </>
  );
};

export default ApplicationSubmitPage;
