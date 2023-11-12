import z from "zod";

const REGEX = /^[a-zA-Z가-힣0-9 ]+$/;

export type NicknameSchemaType = z.infer<typeof nicknameSchema>;
export type PositionAndStacksSchemaType = z.infer<
  typeof positionAndStacksSchema
>;

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .refine((value) => value.trim().length >= 2 && value.trim().length <= 15, {
      message: "닉네임을 2글자 이상 15글자 이하로 입력해주세요!",
    })
    .refine((value) => /\S/.test(value), {
      message: "닉네임은 양 쪽 공백을 제외하고 문자로 구성되어야 합니다!",
    })
    .refine((value) => REGEX.test(value), {
      message: "닉네임은 한글, 영문, 숫자만 가능합니다!",
    }),
});

export const positionAndStacksSchema = z.object({
  position: z
    .number({
      required_error: "모집 분야를 선택해주세요.",
    })
    .positive("모집 분야를 선택해주세요."),
  stacks: z
    .number()
    .array()
    .refine((value) => value.length > 0, {
      message: "기술 스택을 입력해주세요.",
    })
    .refine((value) => value.length <= 5, {
      message: "기술 스택은 최대 5개까지 선택 가능합니다.",
    }),
});
