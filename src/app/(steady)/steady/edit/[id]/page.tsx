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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import type { SteadyEditStateType } from "@/schemas/steadyEditSchema";
import { SteadyEditSchema } from "@/schemas/steadyEditSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator, TextArea } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parse } from "date-fns";
import getPositions from "@/services/steady/getPositions";
import getStacks from "@/services/steady/getStacks";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import updateSteady from "@/services/steady/updateSteady";
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
  steadyCategories,
  steadyExpectedPeriods,
  steadyParticipantsLimit,
  steadyRecruitmentStatus,
  steadyRunningMethods,
} from "@/constants/create-steady";

const SteadyEditPage = ({
  params: { id: steadyId },
}: {
  params: { id: string };
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { data, error } = useSuspenseQuery({
    queryKey: ["steady"],
    queryFn: () => getSteadyDetails(steadyId),
  });

  const { data: positionItems, error: positionsError } =
    useSuspenseQuery<PositionResponse>({
      queryKey: ["positions"],
      queryFn: () => getPositions(),
    });

  const { data: stackItems, error: stacksError } =
    useSuspenseQuery<StackResponse>({
      queryKey: ["stacks"],
      queryFn: () => getStacks(),
    });

  const steadyEditForm = useForm<SteadyEditStateType>({
    resolver: zodResolver(SteadyEditSchema),
  });

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (positionsError) {
    console.error(positionsError);
  }

  if (stacksError) {
    console.error(stacksError);
  }

  const {
    id,
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

  const positionsInitialData = positions.map((position) => ({
    label: position.name,
    value: position.id.toString(),
  }));

  const positionsItemsData = positionItems.positions.map((position) => ({
    value: position.id.toString(),
    label: position.name,
  }));

  const stacksInitialData = stacks.map((stack) => ({
    label: stack.name,
    value: stack.id.toString(),
  }));

  const stacksItemsData = stackItems.stacks.map((stack) => ({
    value: stack.id.toString(),
    label: stack.name,
  }));

  const onSubmit = async (data: SteadyEditStateType) => {
    updateSteady(id, data).then((res) => {
      if (res.status === 204) {
        toast({ variant: "green", description: "스테디가 수정되었습니다!" });
        router.push(`/steady/detail/${id}`);
      } else {
        toast({ variant: "red", description: "스테디 수정에 실패하였습니다." });
      }
    });
  };

  return (
    <div className={cn("mt-30")}>
      <Form {...steadyEditForm}>
        <form onSubmit={steadyEditForm.handleSubmit(onSubmit)}>
          <h1 className={cn("mx-8 font-semibold")}>
            {CREATE_STEADY_PAGE_HEADING}
          </h1>
          <Separator
            size={"4"}
            my={"3"}
            className={cn("h-3 bg-st-gray-400")}
          />
          <FormField
            control={steadyEditForm.control}
            defaultValue={name}
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
          <div className={cn("my-10")} />
          <FormField
            control={steadyEditForm.control}
            name={"bio"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    inputName={"steady-bio-input"}
                    initialValue={bio}
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
            <div className={cn("mx-20 flex flex-row justify-between gap-15")}>
              <FormField
                control={steadyEditForm.control}
                defaultValue={type}
                name={"type"}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <SingleSelector
                        initialLabel={"프로젝트 / 스터디"}
                        initialData={type}
                        items={steadyCategories}
                        className={cn("w-200")}
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
                defaultValue={steadyMode}
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
                defaultValue={participantLimit}
                name={"participantLimit"}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"스테디 정원"}
                      initialData={participantLimit}
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
                control={steadyEditForm.control}
                defaultValue={deadline}
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
            <div className={cn("my-10")} />
            <div className={cn("mx-20 flex flex-row justify-between gap-15")}>
              <FormField
                control={steadyEditForm.control}
                defaultValue={extractValue(positionsInitialData).map(Number)}
                name={"positions"}
                render={({ field }) => (
                  <FormItem>
                    <MultiSelector
                      initialLabel={"모집 분야"}
                      initialData={positionsInitialData}
                      items={positionsItemsData}
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
                defaultValue={scheduledPeriod}
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
                defaultValue={extractValue(stacksInitialData).map(Number)}
                name={"stacks"}
                render={({ field }) => (
                  <FormItem>
                    <MultiSelector
                      initialLabel={"기술 스택"}
                      initialData={stacksInitialData}
                      items={stacksItemsData}
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
                name={"status"}
                control={steadyEditForm.control}
                defaultValue={status}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"상태"}
                      initialData={status}
                      items={steadyRecruitmentStatus}
                      className={cn("w-200")}
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
              className={cn("h-3 bg-st-gray-400")}
            />
            <FormField
              control={steadyEditForm.control}
              defaultValue={title}
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
              defaultValue={content}
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
                onClick={() => router.back()}
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
