import * as z from "zod";
import { number } from "zod";
import { extractValue } from "@/utils/extractValue";
import {
  steadyCategories,
  steadyExpectedPeriods,
  steadyRunningMethods,
} from "@/constants/selectorItems";

export const SteadySchema = z.object({
  name: z.string({ required_error: "스테디의 이름을 입력해주세요." }),
  bio: z.string({ required_error: "스테디의 소개를 입력해주세요." }),
  type: z.enum(extractValue(steadyCategories), {
    required_error: "스테디의 유형을 선택해주세요.",
  }),
  participantLimit: z
    .number({ required_error: "스테디의 정원을 선택해주세요." })
    .min(2)
    .max(10),
  steadyMode: z.enum(extractValue(steadyRunningMethods), {
    required_error: "스테디의 진행 방식을 선택해주세요.",
  }),
  scheduledPeriod: z.enum(extractValue(steadyExpectedPeriods), {
    required_error: "스테디의 예상 진행 기간을 선택해주세요.",
  }),
  deadline: z.string({
    required_error: "스테디의 모집 마감일을 선택해주세요.",
  }),
  title: z.string({ required_error: "스테디의 모집글 제목을 입력해주세요." }),
  content: z.string({
    required_error: "스테디의 모집글 내용을 입력해주세요.",
  }),
  positions: z.array(number(), {
    required_error: "스테디의 모집 분야를 선택해주세요.",
  }),
  stacks: z.array(number(), {
    required_error: "스테디의 기술 스택을 선택해주세요.",
  }),
});

export type SteadyStateType = z.infer<typeof SteadySchema>;
