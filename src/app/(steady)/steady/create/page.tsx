"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import useCreateSteadyStore from "@/stores/createSteadyData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator, TextArea } from "@radix-ui/themes";
import type * as z from "zod";
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
  STEADY_RECRUITMENT_EXAMPLE,
  STEADY_SECTION_INTRO,
  steadyCategories,
  steadyExpectedPeriods,
  steadyExpectedTechStacks,
  steadyParticipantsLimit,
  steadyRecruitmentFields,
  steadyRunningMethods,
} from "@/constants/create-steady";
import { SteadySchema } from "@/constants/schemas";

const CreateSteadyPage = () => {
  const router = useRouter();
  const { setSteadyState } = useCreateSteadyStore();
  const steadyForm = useForm<z.infer<typeof SteadySchema>>({
    resolver: zodResolver(SteadySchema),
  });

  const onSubmit = (data: z.infer<typeof SteadySchema>) => {
    setSteadyState(data);
    router.push("/steady/create/questions");
  };

  return (
    <div className={cn("mt-30")}>
      <Form {...steadyForm}>
        <form onSubmit={steadyForm.handleSubmit(onSubmit)}>
          <h1 className={cn("mx-8 font-semibold")}>{STEADY_SECTION_INTRO}</h1>
          <Separator
            size={"4"}
            my={"3"}
            className={cn("h-5 bg-st-gray-400")}
          />
          <div className={cn("mx-40 flex flex-row justify-between")}>
            <FormField
              control={steadyForm.control}
              name={"type"}
              render={({ field }) => (
                <FormItem>
                  <SingleSelector
                    initialLabel={"프로젝트 / 스터디"}
                    items={steadyCategories}
                    className={cn("w-430")}
                    onSelectedChange={(selected) => {
                      field.onChange(selected);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={steadyForm.control}
              name={"participantLimit"}
              render={({ field }) => (
                <FormItem>
                  <SingleSelector
                    initialLabel={"스테디 정원"}
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
            control={steadyForm.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    inputName={"steady-title-input"}
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
            control={steadyForm.control}
            name={"bio"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextArea
                    className={cn("h-380 w-full")}
                    my={"3"}
                    placeholder={"스테디 소개"}
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
                control={steadyForm.control}
                name={"positions"}
                render={({ field }) => (
                  <FormItem>
                    <MultiSelector
                      initialLabel={"모집 분야"}
                      items={steadyRecruitmentFields}
                      className={cn("w-200")}
                      onSelectedChange={(selected) => {
                        field.onChange(extractValue(selected));
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={steadyForm.control}
                name={"steadyMode"}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"진행 방식"}
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
                control={steadyForm.control}
                name={"scheduledPeriod"}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"예상 기간"}
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
                control={steadyForm.control}
                name={"deadline"}
                render={({ field }) => (
                  <FormItem>
                    <DateSelector
                      initialLabel={"마감일"}
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
                control={steadyForm.control}
                name={"stacks"}
                render={({ field }) => (
                  <FormItem>
                    <MultiSelector
                      initialLabel={"기술 스택"}
                      items={steadyExpectedTechStacks}
                      className={cn("w-280")}
                      onSelectedChange={(selected) => {
                        field.onChange(extractValue(selected));
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
              control={steadyForm.control}
              name={"title"}
              render={({ field }) => (
                <FormItem>
                  <Input
                    inputName={"title-input"}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={steadyForm.control}
              name={"content"}
              render={({ field }) => (
                <FormItem>
                  <TextArea
                    className={cn("h-720 w-full")}
                    my={"3"}
                    defaultValue={STEADY_RECRUITMENT_EXAMPLE}
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
                다음
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateSteadyPage;
