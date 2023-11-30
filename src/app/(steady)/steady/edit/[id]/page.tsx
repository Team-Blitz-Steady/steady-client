"use client";

import { useEffect, useRef, useState } from "react";
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
import type { MDXEditorMethods } from "@mdxeditor/editor";
import { Separator } from "@radix-ui/themes";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import getPositions from "@/services/steady/getPositions";
import getStacks from "@/services/steady/getStacks";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import updateSteady from "@/services/steady/updateSteady";
import type { PositionResponse, StackResponse } from "@/services/types";
import Button, { buttonSize } from "@/components/_common/Button";
import { ForwardRefEditor as RichEditor } from "@/components/_common/Editor/ForwardedRefEditor";
import Input from "@/components/_common/Input";
import {
  DateSelector,
  MultiSelector,
  SingleSelector,
} from "@/components/_common/Selector";
import { extractValue } from "@/utils/extractValue";
import { CREATE_STEADY_PAGE_HEADING } from "@/constants/labelData";
import {
  PositionsKey,
  StacksKey,
  getSteadyDetailsKey,
} from "@/constants/queryKeys";
import {
  steadyCategories,
  steadyExpectedPeriods,
  steadyParticipantsLimit,
  steadyRecruitmentStatus,
  steadyRunningMethods,
} from "@/constants/selectorItems";

const SteadyEditPage = ({
  params: { id: steadyId },
}: {
  params: { id: string };
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { data, error, refetch } = useSuspenseQuery({
    queryKey: getSteadyDetailsKey(steadyId),
    queryFn: () => getSteadyDetails(steadyId),
  });

  useEffect(() => {
    if (editorRef.current) {
      unified()
        .use(rehypeParse)
        .use(rehypeRemark)
        .use(remarkStringify)
        .process(data.content)
        .then((file) => editorRef.current?.setMarkdown(String(file.value)))
        .catch((error) => {
          throw error;
        });
    }
  }, [editorLoaded]);

  const { data: positionItems, error: positionsError } =
    useSuspenseQuery<PositionResponse>({
      queryKey: PositionsKey,
      queryFn: () => getPositions(),
    });

  const { data: stackItems, error: stacksError } =
    useSuspenseQuery<StackResponse>({
      queryKey: StacksKey,
      queryFn: () => getStacks(),
    });

  const steadyEditForm = useForm<SteadyEditStateType>({
    resolver: zodResolver(SteadyEditSchema),
  });

  if (error || positionsError || stacksError) {
    return (
      <div className={"flex h-112 w-full items-center justify-center"}>
        <div>에러가 발생했습니다.</div>
      </div>
    );
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
    contact,
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
    const res = await updateSteady(id, data);
    if (res.status === 204) {
      toast({ variant: "green", description: "스테디가 수정되었습니다!" });
      await queryClient.invalidateQueries({
        queryKey: getSteadyDetailsKey(id),
      });
      await refetch();
      router.replace(`/steady/detail/${id}`);
    } else {
      toast({ variant: "red", description: "스테디 수정에 실패하였습니다." });
    }
  };

  return (
    <div
      className={cn("mt-10 max-sm:w-400 sm:w-450 md:w-600 lg:w-800 xl:w-1000")}
    >
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
          <div className="flex flex-col gap-10">
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
            <FormField
              control={steadyEditForm.control}
              defaultValue={bio}
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
                        className={cn("w-full")}
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
                control={steadyEditForm.control}
                defaultValue={participantLimit}
                name={"participantLimit"}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"스테디 정원"}
                      initialData={participantLimit}
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
                control={steadyEditForm.control}
                defaultValue={deadline}
                name={"deadline"}
                render={({ field }) => (
                  <FormItem>
                    <DateSelector
                      initialLabel={"마감일"}
                      initialDate={parse(deadline, "yyyy-MM-dd", new Date())}
                      className={cn("w-full")}
                      onDateChange={(date) => {
                        field.onChange(format(date, "yyyy-MM-dd"));
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={steadyEditForm.control}
                defaultValue={extractValue(positionsInitialData).map(Number)}
                name={"positions"}
                render={({ field }) => (
                  <FormItem className="h-40">
                    <MultiSelector
                      initialLabel={"모집 분야"}
                      initialData={positionsInitialData}
                      items={positionsItemsData}
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
                control={steadyEditForm.control}
                defaultValue={scheduledPeriod}
                name={"scheduledPeriod"}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"예상 기간"}
                      initialData={scheduledPeriod}
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
                control={steadyEditForm.control}
                defaultValue={extractValue(stacksInitialData).map(Number)}
                name={"stacks"}
                render={({ field }) => (
                  <FormItem className="h-40">
                    <MultiSelector
                      initialLabel={"기술 스택"}
                      initialData={stacksInitialData}
                      items={stacksItemsData}
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
                name={"status"}
                control={steadyEditForm.control}
                defaultValue={status}
                render={({ field }) => (
                  <FormItem>
                    <SingleSelector
                      initialLabel={"상태"}
                      initialData={status}
                      items={steadyRecruitmentStatus}
                      className={cn("w-full")}
                      onSelectedChange={(selected) => {
                        field.onChange(selected);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={steadyEditForm.control}
              name={"contact"}
              defaultValue={contact}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      inputName={"steady-contact-input"}
                      initialValue={contact}
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
              render={({ field }) => {
                return (
                  <FormItem
                    className={
                      "my-10 h-720 w-full rounded-10 border-2 border-st-gray-75"
                    }
                  >
                    <RichEditor
                      contentEditableClassName={"prose"}
                      ref={editorRef}
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
                      setIsLoaded={setEditorLoaded}
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className={"flex justify-end gap-20"}>
              <Button
                className={cn(`${buttonSize.sm} items-center justify-center`)}
                onClick={(event) => {
                  event.preventDefault();
                  router.back();
                }}
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
