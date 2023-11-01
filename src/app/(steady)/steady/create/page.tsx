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

const steadyCategories = [
  { value: "study", label: "스터디" },
  { value: "project", label: "프로젝트" },
];

const steadyParticipantsLimit = [
  { value: "2", label: "2명" },
  { value: "3", label: "3명" },
  { value: "4", label: "4명" },
  { value: "5", label: "5명" },
  { value: "6", label: "6명" },
  { value: "7", label: "7명" },
  { value: "8", label: "8명" },
  { value: "9", label: "9명" },
  { value: "10", label: "10명" },
];

const steadyRecruitmentFields = [
  { value: "frontend", label: "프론트엔드" },
  { value: "backend", label: "백엔드" },
  { value: "design", label: "디자인" },
  { value: "planning", label: "기획" },
  { value: "marketing", label: "마케팅" },
  { value: "etc", label: "기타" },
];

const steadyRunningMethods = [
  { value: "offline", label: "오프라인" },
  { value: "online", label: "온라인" },
];

const steadyExpectedPeriods = [
  { value: "TO_BE_DETERMINED", label: "미정" },
  { value: "ONE_WEEK", label: "1주" },
  { value: "TWO_WEEK", label: "2주" },
  { value: "THREE_WEEK", label: "3주" },
  { value: "FOUR_WEEK", label: "4주" },
  { value: "FIVE_WEEK", label: "5주" },
  { value: "TWO_MONTH", label: "2개월" },
  { value: "THREE_MONTH", label: "3개월" },
  { value: "FOUR_MONTH", label: "4개월" },
  { value: "FIVE_MONTH", label: "5개월" },
  { value: "SIX_MONTH", label: "6개월" },
  { value: "LONG_TERM", label: "장기" },
];

const steadyExpectedParticipants = [
  { value: "1", label: "1명" },
  { value: "2", label: "2명" },
  { value: "3", label: "3명" },
  { value: "4", label: "4명" },
  { value: "5", label: "5명" },
  { value: "6", label: "6명" },
  { value: "7", label: "7명" },
  { value: "8", label: "8명" },
  { value: "9", label: "9명" },
  { value: "10", label: "10명" },
];

const steadyExpectedTechStacks = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "vue", label: "Vue" },
  { value: "nuxtjs", label: "Nuxt.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "express", label: "Express" },
  { value: "nestjs", label: "Nest.js" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "spring", label: "Spring" },
  { value: "mybatis", label: "MyBatis" },
  { value: "jpa", label: "JPA" },
  { value: "hibernate", label: "Hibernate" },
  { value: "mysql", label: "MySQL" },
  { value: "mariadb", label: "MariaDB" },
];

const CreateSteadyPage = () => {
  return (
    <div className={cn("mt-30")}>
      <div>
        <h1 className={cn("mx-8 font-semibold")}>
          📖 스테디 정보를 입력해주세요.
        </h1>
        <Separator
          size={"4"}
          my={"3"}
          className={cn("border-[1.5px] border-st-black")}
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
          className={cn("border-[1.5px] border-st-black")}
        />
        <Input inputName={"steady-title-input"} />
        <TextArea
          className={cn("h-380 w-full")}
          my={"3"}
        />
      </div>
      <div className={cn("mt-30")}>
        <h1 className={cn("mx-8 font-semibold")}>
          ✍️ 모집글 정보를 입력해주세요.
        </h1>
        <Separator
          size={"4"}
          my={"3"}
          className={cn("border-[1.5px] border-st-black")}
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
          className={cn("border-[1.5px] border-st-black")}
        />
        <Input inputName={"title-input"} />
        <Input inputName={"tag-input"} />
        <TextArea
          className={cn("h-720 w-full")}
          my={"3"}
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
