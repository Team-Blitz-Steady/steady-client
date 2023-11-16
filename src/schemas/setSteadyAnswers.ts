import { z } from "zod";

export type SteadyAnswersSchemaType = z.infer<typeof steadyAnswersSchema>;

export const steadyAnswersSchema = z.object({
  answers: z
    .string()
    .min(1, { message: "필수 항목 입니다." })
    .max(1000, { message: "1000자 이하로 입력해주세요." }),
});
