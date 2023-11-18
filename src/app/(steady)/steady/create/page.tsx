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
import { useSuspenseQuery } from "@tanstack/react-query";
import getPositions from "@/services/steady/getPositions";
import getStacks from "@/services/steady/getStacks";
import type { PositionResponse, StackResponse } from "@/services/types";
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
  CREATE_STEADY_PAGE_HEADING,
  STEADY_RECRUITMENT_EXAMPLE,
  steadyCategories,
  steadyExpectedPeriods,
  steadyParticipantsLimit,
  steadyRunningMethods,
} from "@/constants/create-steady";
import type { SteadyStateType } from "@/constants/schemas/steadySchema";
import { SteadySchema } from "@/constants/schemas/steadySchema";

const CreateSteadyPage = () => {
  const router = useRouter();
  const { setSteadyState } = useCreateSteadyStore();
  const steadyForm = useForm<SteadyStateType>({
    resolver: zodResolver(SteadySchema),
  });
  const { data: positions, error: positionsError } =
    useSuspenseQuery<PositionResponse>({
      queryKey: ["positions"],
      queryFn: () => getPositions(),
    });

  if (positionsError) {
    console.error(positionsError);
  }

  const { data: stacks, error: stacksError } = useSuspenseQuery<StackResponse>({
    queryKey: ["stacks"],
    queryFn: () => getStacks(),
  });

  if (stacksError) {
    console.error(stacksError);
  }

  const onSubmit = (data: SteadyStateType) => {
    setSteadyState(data);
    router.push("/steady/create/questions");
  };

  return (
    <div className={cn("mt-30")}>
      <Form {...steadyForm}>
        <form onSubmit={steadyForm.handleSubmit(onSubmit)}>
          <h1 className={cn("mx-8 font-semibold")}>
            {CREATE_STEADY_PAGE_HEADING}
          </h1>
          <Separator
            size={"4"}
            my={"3"}
            className={cn("h-3 bg-st-gray-400")}
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
          <div className={cn("my-10")}></div>
          <FormField
            control={steadyForm.control}
            name={"bio"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    inputName={"steady-bio-input"}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={cn("mt-30")}>
            <Separator
              size={"4"}
              my={"3"}
              className={cn("h-3 bg-st-gray-400")}
            />
            <div
              className={cn("mx-20 my-10 flex flex-row justify-between gap-15")}
            >
              <FormField
                control={steadyForm.control}
                name={"type"}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"프로젝트 / 스터디"}
                      items={steadyCategories}
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
                name={"participantLimit"}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"스테디 정원"}
                      items={steadyParticipantsLimit}
                      className={cn("w-200")}
                      onSelectedChange={(selected) => {
                        field.onChange(Number(selected));
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
            <div
              className={cn("mx-20 my-10 flex flex-row justify-between gap-15")}
            >
              <FormField
                control={steadyForm.control}
                name={"positions"}
                render={({ field }) => (
                  <FormItem>
                    <MultiSelector
                      initialLabel={"모집 분야"}
                      items={positions.positions.map((position) => ({
                        value: position.id.toString(),
                        label: position.name,
                      }))}
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
                name={"stacks"}
                render={({ field }) => (
                  <FormItem>
                    <MultiSelector
                      initialLabel={"기술 스택"}
                      items={stacks.stacks.map((stack) => ({
                        value: stack.id.toString(),
                        label: stack.name,
                      }))}
                      className={cn("w-455")}
                      onSelectedChange={(selected) => {
                        field.onChange(extractValue(selected).map(Number));
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
              className={cn("h-3 bg-st-gray-400")}
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
