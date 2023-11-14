"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator, TextArea } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parse } from "date-fns";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import Button, { buttonSize } from "@/components/_common/Button";
import Input from "@/components/_common/Input";
import {
  DateSelector,
  MultiSelector,
  SingleSelector,
} from "@/components/_common/Selector";
import { extractValue } from "@/utils/extractValue";
import { formatDate } from "@/utils/formatDate";
import {
  RECRUITMENT_SECTION_INTRO,
  STEADY_SECTION_INTRO,
  steadyCategories,
  steadyExpectedPeriods,
  steadyExpectedTechStacks,
  steadyParticipantsLimit,
  steadyRecruitmentFields,
  steadyRecruitmentStatus,
  steadyRunningMethods,
} from "@/constants/create-steady";
import type { SteadyEditStateType } from "@/constants/schemas/steadyEditSchema";
import { SteadyEditSchema } from "@/constants/schemas/steadyEditSchema";

const SteadyEditPage = ({
  params: { id: steadyId },
}: {
  params: { id: string };
}) => {
  const steadyEditForm = useForm<SteadyEditStateType>({
    resolver: zodResolver(SteadyEditSchema),
  });

  const onSubmit = (data: SteadyEditStateType) => {
    console.log(data);
  };

  const { data, error } = useSuspenseQuery({
    queryKey: ["steady"],
    queryFn: () => getSteadyDetails(steadyId),
  });

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  const {
    // id,
    name,
    bio,
    type,
    status,
    participantLimit,
    steadyMode,
    scheduledPeriod,
    deadline,
    title,
    content,
    positions,
    stacks,
  } = data;

  return (
    <div className={cn("mt-30")}>
      <Form {...steadyEditForm}>
        <form onSubmit={steadyEditForm.handleSubmit(onSubmit)}>
          <h1 className={cn("mx-8 font-semibold")}>{STEADY_SECTION_INTRO}</h1>
          <Separator
            size={"4"}
            my={"3"}
            className={cn("h-5 bg-st-gray-400")}
          />
          <div className={cn("mx-40 flex flex-row justify-between")}>
            <FormField
              control={steadyEditForm.control}
              name={"type"}
              render={({ field }) => {
                field.value = type;
                return (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"프로젝트 / 스터디"}
                      initialData={type}
                      items={steadyCategories}
                      className={cn("w-430")}
                      onSelectedChange={(selected) => {
                        field.onChange(selected);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={steadyEditForm.control}
              name={"participantLimit"}
              render={({ field }) => (
                <FormItem>
                  <SingleSelector
                    initialLabel={"스테디 정원"}
                    initialData={participantLimit}
                    items={steadyParticipantsLimit}
                    className={cn("w-430")}
                    onSelectedChange={(selected) => {
                      field.onChange(Number(selected));
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator
            size={"4"}
            my={"3"}
            className={cn("h-5 bg-st-gray-400")}
          />
          <FormField
            control={steadyEditForm.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    inputName={"steady-title-input"}
                    initialValue={name}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={steadyEditForm.control}
            name={"bio"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextArea
                    className={cn("h-380 w-full")}
                    my={"3"}
                    placeholder={"스테디 소개"}
                    defaultValue={bio}
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              <FormField
                control={steadyEditForm.control}
                name={"positions"}
                render={({ field }) => (
                  <FormItem>
                    <MultiSelector
                      initialLabel={"모집 분야"}
                      initialData={positions.map((position) => {
                        return {
                          label: position.name,
                          value: position.id.toString(),
                        };
                      })}
                      items={steadyRecruitmentFields}
                      className={cn("w-200")}
                      onSelectedChange={(selected) => {
                        field.onChange(extractValue(selected).map(Number));
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={steadyEditForm.control}
                name={"steadyMode"}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"진행 방식"}
                      initialData={steadyMode}
                      items={steadyRunningMethods}
                      className={cn("w-200")}
                      onSelectedChange={(selected) => {
                        field.onChange(selected);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={steadyEditForm.control}
                name={"scheduledPeriod"}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"예상 기간"}
                      initialData={scheduledPeriod}
                      items={steadyExpectedPeriods}
                      className={cn("w-200")}
                      onSelectedChange={(selected) => {
                        field.onChange(selected);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={steadyEditForm.control}
                name={"deadline"}
                render={({ field }) => (
                  <FormItem>
                    <DateSelector
                      initialLabel={"마감일"}
                      initialDate={parse(deadline, "yyyy-MM-dd", new Date())}
                      className={cn("w-200")}
                      onDateChange={(date) => {
                        field.onChange(formatDate(date));
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={cn("mx-20 flex flex-row justify-start gap-15")}>
              <FormField
                control={steadyEditForm.control}
                name={"stacks"}
                render={({ field }) => (
                  <FormItem>
                    <MultiSelector
                      initialLabel={"기술 스택"}
                      initialData={stacks.map((stack) => {
                        return {
                          label: stack.name,
                          value: stack.id.toString(),
                        };
                      })}
                      items={steadyExpectedTechStacks}
                      className={cn("w-280")}
                      onSelectedChange={(selected) => {
                        field.onChange(extractValue(selected).map(Number));
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={"status"}
                control={steadyEditForm.control}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"상태"}
                      initialData={status}
                      items={steadyRecruitmentStatus}
                      className={cn("w-280")}
                      onSelectedChange={(selected) => {
                        field.onChange(selected);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator
              size={"4"}
              my={"3"}
              className={cn("h-5 bg-st-gray-400")}
            />
            <FormField
              control={steadyEditForm.control}
              name={"title"}
              render={({ field }) => (
                <FormItem>
                  <Input
                    inputName={"title-input"}
                    initialValue={title}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={steadyEditForm.control}
              name={"content"}
              render={({ field }) => (
                <FormItem>
                  <TextArea
                    className={cn("h-720 w-full")}
                    my={"3"}
                    defaultValue={content}
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
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
                type={"submit"}
              >
                수정
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SteadyEditPage;
