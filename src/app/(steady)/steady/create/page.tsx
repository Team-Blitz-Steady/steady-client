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
  STEADY_RECRUITMENT_EXAMPLE,
  STEADY_SECTION_INTRO,
  steadyCategories,
  steadyExpectedParticipants,
  steadyExpectedPeriods,
  steadyExpectedTechStacks,
  steadyParticipantsLimit,
  steadyRecruitmentFields,
  steadyRunningMethods,
} from "@/constants/create-steady";

const CreateSteadyPage = () => {
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
            items={steadyCategories}
            className={cn("w-430")}
          />
          <SingleSelector
            initialLabel={"스테디 정원"}
            items={steadyParticipantsLimit}
            className={cn("w-430")}
          />
        </div>
        <Separator
          size={"4"}
          my={"3"}
          className={cn("h-5 bg-st-gray-400")}
        />
        <Input inputName={"steady-title-input"} />
        <TextArea
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
            items={steadyRecruitmentFields}
            className={cn("w-200")}
          />
          <SingleSelector
            initialLabel={"진행 방식"}
            items={steadyRunningMethods}
            className={cn("w-200")}
          />
          <SingleSelector
            initialLabel={"예상 기간"}
            items={steadyExpectedPeriods}
            className={cn("w-200")}
          />
          <DateSelector
            initialLabel={"마감일"}
            className={cn("w-200")}
          />
        </div>
        <div className={cn("mx-20 flex flex-row justify-start gap-15")}>
          <MultiSelector
            initialLabel={"기술 스택"}
            items={steadyExpectedTechStacks}
            className={cn("w-280")}
          />
          <SingleSelector
            initialLabel={"모집 인원"}
            items={steadyExpectedParticipants}
          />
        </div>

        <Separator
          size={"4"}
          my={"3"}
          className={cn("h-5 bg-st-gray-400")}
        />
        <Input inputName={"title-input"} />
        <Input inputName={"tag-input"} />
        <TextArea
          className={cn("h-720 w-full")}
          my={"3"}
          defaultValue={STEADY_RECRUITMENT_EXAMPLE}
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
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateSteadyPage;
