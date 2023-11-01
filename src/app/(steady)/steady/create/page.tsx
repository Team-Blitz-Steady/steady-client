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
  { value: "1", label: "1주" },
  { value: "2", label: "2주" },
  { value: "3", label: "3주" },
  { value: "4", label: "4주" },
  { value: "5", label: "5주" },
  { value: "6", label: "6주" },
  { value: "7", label: "7주" },
  { value: "8", label: "8주" },
  { value: "9", label: "9주" },
  { value: "10", label: "10주" },
  { value: "11", label: "11주" },
  { value: "12", label: "12주" },
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
        <div className={cn("mx-20 flex flex-row justify-between")}>
          <SingleSelector items={steadyCategories} />
          <SingleSelector items={steadyParticipantsLimit} />
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
        <div className={cn("mx-20 flex flex-row justify-between")}>
          <SingleSelector items={steadyRecruitmentFields} />
          <SingleSelector items={steadyRunningMethods} />
          <SingleSelector items={steadyExpectedPeriods} />
          <DateSelector />
        </div>
        <div className={cn("mx-20 flex flex-row justify-between")}>
          <MultiSelector items={steadyExpectedTechStacks} />
          <SingleSelector items={steadyExpectedParticipants} />
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
