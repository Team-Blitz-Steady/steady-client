"use client";

import { useParams, useRouter } from "next/navigation";
import { Separator } from "@radix-ui/themes";
import Button, { buttonSize } from "@/components/_common/Button";

const SteadyPrimitive = {
  id: "2",
  title: "예감 스터디",
};

const Form = {
  id: "2", // Form id
  title: "예감 스터디 양식", // Form 제목
  questions: [
    "당신의 이름은?",
    "당신의 나이는?",
    "당신의 성별은?",
    "당신은 언제 언제 나오나요?",
    "당신이 가장 잘하는 분야는?",
    "당신은 부지런한가요?",
    "힘든 스터디일 수도 있습니다 버틸 수 있나요요?",
    "당신은 올빼미인가요? 종달새 인가요?",
    "당신의 MBTI는?",
    "세상에서 가장 긴 글을 작성하고 싶습니다 글자수를 제한해야 하지 않을까요?ddddddddddddddddddddddddddddd",
  ], // Form 질문
  createdAt: "2023.10.30", // Form 생성일
  updatedAt: "2023.11.11", // Form 업데이트일
};

// TODO: 신청서 작성 성공시 Toast 성공 알림
// TODO: react-hook-form과 ZOD로 유효성 검사
const ApplicationSubmitPage = () => {
  const params = useParams();
  const router = useRouter();
  console.log(params.id); // 2

  return (
    <div className="flex flex-col gap-20 ">
      <div className="flex flex-row items-center gap-10 text-30 font-bold">
        <div className=" text-st-primary">{SteadyPrimitive.title}</div>
        <div>참여 신청서</div>
      </div>
      <Separator className="st-gray-400 h-3 w-auto" />
      <div className="flex flex-col gap-30 px-100">
        {Form.questions.map((question, id) => (
          <div
            key={id}
            className="flex w-full flex-col gap-15"
          >
            <div className="flex gap-10 text-20 font-bold">
              질문 {id + 1}.{question}
            </div>
            <textarea className="h-100 w-full rounded-12 border-3 border-st-skyblue-300" />
          </div>
        ))}
      </div>
      <Separator className="st-gray-400 h-3 w-auto" />
      {/* TODO: 라우터 연결 */}
      <div className="flex items-center justify-end gap-20">
        <Button
          className={`${buttonSize.sm} bg-st-white`}
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          onClick={() => router.push("/")}
          className={`${buttonSize.sm} bg-st-primary text-st-white`}
        >
          작성 완료
        </Button>
      </div>
    </div>
  );
};

export default ApplicationSubmitPage;
