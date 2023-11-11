import z from "zod";

const REGEX = /^[a-zA-Z가-힣0-9]+$/;

export type NicknameSchemaType = z.infer<typeof nicknameSchema>;

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: "닉네임을 2글자 이상 입력해주세요!" })
    .max(15, { message: "닉네임을 15글자 이하로 입력해주세요!" })
    .trim()
    .regex(REGEX, {
      message: "닉네임은 한글, 영문, 숫자만 가능합니다!",
    }),
});
