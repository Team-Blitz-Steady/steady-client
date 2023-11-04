"use client";

import { cn } from "@/lib/utils";
import { Separator, TextArea } from "@radix-ui/themes";
import Button, { buttonSize } from "@/components/_common/Button";
import Input from "@/components/_common/Input";
import {
  DateSelector,
  MultiSelector,
  SingleSelector,
} from "@/components/_common/Selector";
import {
  RECRUITMENT_SECTION_INTRO,
  STEADY_RESPONSE_MOCK_DATA,
  STEADY_SECTION_INTRO,
  steadyCategories,
  steadyExpectedPeriods,
  steadyExpectedTechStacks,
  steadyParticipantsLimit,
  steadyRecruitmentFields,
  steadyRecruitmentStatus,
  steadyRunningMethods,
} from "@/constants/create-steady";

const SteadyEditPage = () => {
  const {
    title: steadyTitle,
    type: steadyType,
    introduction: steadyIntroduction,
    expectedPeriod: steadyExpectedPeriod,
    stacks: steadyTechStacks,
    deadline: steadyDeadline,
    participantLimit: numberOfParticipants,
    status: steadyStatus,
    recruitCategory: steadyRecruitmentCategory,
    method: steadyMethod,
    recruitTitle: steadyRecruitmentTitle,
    recruitTags: steadyRecruitmentTags,
    recruitContent: steadyRecruitmentContent,
  } = STEADY_RESPONSE_MOCK_DATA;
  return (
    <div className={cn("mt-30")}>
      <div>
        <h1 className={cn("mx-8 font-semibold")}>{STEADY_SECTION_INTRO}</h1>

        <Separator
          size={"4"}
          my={"3"}
          className={cn("h-5 bg-st-gray-400")}
        />
        <div className={cn("mx-40 flex flex-row justify-between")}>
          <SingleSelector
            initialLabel={"프로젝트 / 스터디"}
            initialData={steadyType}
            items={steadyCategories}
            className={cn("w-430")}
          />
          <SingleSelector
            initialLabel={"스테디 정원 수정"}
            initialData={{
              value: numberOfParticipants,
              label: numberOfParticipants,
            }}
            items={steadyParticipantsLimit}
            className={cn("w-430")}
          />
        </div>
        <Separator
          size={"4"}
          my={"3"}
          className={cn("h-5 bg-st-gray-400")}
        />
        <Input
          inputName={"steady-title-input"}
          initialValue={steadyTitle}
        />
        <TextArea
          defaultValue={steadyIntroduction}
          className={cn("h-380 w-full")}
          my={"3"}
        />
      </div>
      <div className={cn("mt-30")}>
        <h1 className={cn("mx-8 font-semibold")}>
          {RECRUITMENT_SECTION_INTRO}
        </h1>

        <Separator
          size={"4"}
          my={"3"}
          className={cn("h-5 bg-st-gray-400")}
        />
        <div className={cn("mx-20 flex flex-row justify-between gap-15")}>
          <MultiSelector
            initialLabel={"모집 분야"}
            initialData={steadyRecruitmentCategory}
            items={steadyRecruitmentFields}
            className={cn("w-200")}
          />
          <SingleSelector
            initialLabel={"진행 방식"}
            initialData={steadyMethod}
            items={steadyRunningMethods}
            className={cn("w-200")}
          />
          <SingleSelector
            initialLabel={"예상 기간"}
            initialData={steadyExpectedPeriod}
            items={steadyExpectedPeriods}
            className={cn("w-200")}
          />
          <DateSelector
            initialLabel={"마감일"}
            initialDate={steadyDeadline}
            className={cn("w-200")}
          />
        </div>
        <div className={cn("mx-20 flex flex-row justify-start gap-15")}>
          <MultiSelector
            initialLabel={"기술 스택"}
            initialData={steadyTechStacks}
            items={steadyExpectedTechStacks}
            className={cn("w-280")}
          />
          <SingleSelector
            initialLabel={"모집 상태"}
            initialData={steadyStatus}
            items={steadyRecruitmentStatus}
          />
        </div>

        <Separator
          size={"4"}
          my={"3"}
          className={cn("h-5 bg-st-gray-400")}
        />
        <Input
          inputName={"title-input"}
          initialValue={steadyRecruitmentTitle}
        />
        <Input
          inputName={"tag-input"}
          initialValue={steadyRecruitmentTags.join(" ")}
        />
        <TextArea
          className={cn("h-720 w-full")}
          my={"3"}
          defaultValue={steadyRecruitmentContent}
        />
        <div className={"flex justify-end gap-20"}>
          <Button
            className={cn(`${buttonSize.sm} items-center justify-center`)}
          >
            취소
          </Button>
          <Button
            className={cn(
              `bg-st-primary ${buttonSize.sm} items-center justify-center text-st-white`,
            )}
          >
            수정
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SteadyEditPage;
