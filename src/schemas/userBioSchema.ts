import * as z from "zod";

export const userBioSchema = z.object({
  bio: z
    .string({ required_error: "한 줄 소개를 입력해주세요." })
    .refine((value) => value.trim().length <= 80, {
      message: "한 줄 소개는 80자 이하여야 합니다.",
    }),
});

export type UserBioType = z.infer<typeof userBioSchema>;
