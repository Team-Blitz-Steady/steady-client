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
import type { SteadyStateType } from "@/schemas/steadySchema";
import { SteadySchema } from "@/schemas/steadySchema";
import useCreateSteadyStore from "@/stores/createSteadyData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import getPositions from "@/services/steady/getPositions";
import getStacks from "@/services/steady/getStacks";
import type { PositionResponse, StackResponse } from "@/services/types";
import Button, { buttonSize } from "@/components/_common/Button";
import { ForwardRefEditor as RichEditor } from "@/components/_common/Editor/ForwardedRefEditor";
import Input from "@/components/_common/Input";
import AlertModal from "@/components/_common/Modal/AlertModal";
import {
  DateSelector,
  MultiSelector,
  SingleSelector,
} from "@/components/_common/Selector";
import { extractValue } from "@/utils/extractValue";
import { CREATE_STEADY_PAGE_HEADING } from "@/constants/labelData";
import { PositionsKey, StacksKey } from "@/constants/queryKeys";
import {
  steadyCategories,
  steadyExpectedPeriods,
  steadyParticipantsLimit,
  steadyRunningMethods,
} from "@/constants/selectorItems";

const CreateSteadyPage = () => {
  const router = useRouter();
  const { steadyState, setSteadyState } = useCreateSteadyStore();
  const steadyForm = useForm<SteadyStateType>({
    resolver: zodResolver(SteadySchema),
  });
  const { data: positions, error: positionsError } =
    useSuspenseQuery<PositionResponse>({
      queryKey: PositionsKey,
      queryFn: () => getPositions(),
    });

  if (positionsError) {
    console.error(positionsError);
  }

  const { data: stacks, error: stacksError } = useSuspenseQuery<StackResponse>({
    queryKey: StacksKey,
    queryFn: () => getStacks(),
  });

  if (stacksError) {
    console.error(stacksError);
  }

  const onSubmit = (data: SteadyStateType) => {
    setSteadyState(data);
    router.push("/steady/create/questions");
  };

  const handleCancelProcess = () => {
    if (steadyState) {
      useCreateSteadyStore.persist.clearStorage();
    }
    router.replace("/");
  };

  return (
    <div
      className={cn("mt-10 max-sm:w-400 sm:w-450 md:w-600 lg:w-800 xl:w-1000")}
    >
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
          <div className="flex flex-col gap-10">
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
          </div>
          <div className={cn("mt-10")}>
            <Separator
              size={"4"}
              my={"3"}
              className={cn("h-3 bg-st-gray-400")}
            />
            <div
              className={cn(
                "mb-15 grid items-center justify-center gap-15 px-20 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4",
              )}
            >
              <FormField
                control={steadyForm.control}
                name={"type"}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"프로젝트 / 스터디"}
                      items={steadyCategories}
                      className={cn("w-full")}
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
                      className={cn("w-full")}
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
                      className={cn("w-full")}
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
                      className={cn("w-full")}
                      onDateChange={(date) => {
                        field.onChange(format(date, "yyyy-MM-dd"));
                      }}
                      pastSelectable={false}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={steadyForm.control}
                name={"positions"}
                render={({ field }) => (
                  <FormItem className="h-40">
                    <MultiSelector
                      initialLabel={"모집 분야"}
                      // TODO: steadyState?.positions에 있는 id값을 가진 position을 뽑아서 initialData로 넣어줘야 함
                      items={positions.positions.map((position) => ({
                        value: position.id.toString(),
                        label: position.name,
                      }))}
                      className={cn("w-full")}
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
                      className={cn("w-full")}
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
                  <FormItem className="h-40 w-450 max-sm:w-360 sm:w-410">
                    <MultiSelector
                      initialLabel={"기술 스택"}
                      items={stacks.stacks.map((stack) => ({
                        value: stack.id.toString(),
                        label: stack.name,
                      }))}
                      className={cn("w-full")}
                      onSelectedChange={(selected) => {
                        field.onChange(extractValue(selected).map(Number));
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={steadyForm.control}
              name={"contact"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      inputName={"steady-contact-input"}
                      initialValue={steadyState?.contact}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <RichEditor
                    className={"min-h-720 w-full"}
                    contentEditableClassName={"prose"}
                    onChange={(markdown) => {
                      unified()
                        .use(remarkParse)
                        .use(remarkRehype)
                        .use(rehypeStringify)
                        .process(markdown)
                        .then((file) => {
                          field.onChange(String(file.value));
                        });
                    }}
                    markdown={""}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={"flex justify-end gap-20"}>
              <AlertModal
                actionButton={
                  <Button
                    className={cn(
                      `bg-st-red ${buttonSize.sm} items-center justify-center text-st-white`,
                    )}
                    onClick={handleCancelProcess}
                  >
                    돌아가기
                  </Button>
                }
                trigger={
                  <Button
                    className={cn(
                      `${buttonSize.sm} items-center justify-center`,
                    )}
                  >
                    취소
                  </Button>
                }
              >
                <div className="text-18 font-bold">
                  메인 페이지로 돌아갈까요? <br /> 작성하시던 데이터가
                  사라집니다!
                </div>
              </AlertModal>
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
