import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { NicknameSchemaType } from "@/schemas/setNickname";
import { nicknameSchema } from "@/schemas/setNickname";
import useLoginStepsStore from "@/stores/loginSteps";
import useNewUserInfoStore from "@/stores/newUserInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import Button, { buttonSize } from "@/components/_common/Button";

export const loginTextStyles = "text-26 font-bold max-mobile:text-20";

const SetNickname = () => {
  const { nickname, setNickname } = useNewUserInfoStore();
  const { setIncreaseSteps } = useLoginStepsStore();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NicknameSchemaType>({ resolver: zodResolver(nicknameSchema) });

  useEffect(() => {
    setValue("nickname", nickname);
  }, [nickname, setValue]);

  const checkNickname = () => {
    setNickname(watch("nickname"));
    setIncreaseSteps();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <div className={loginTextStyles}>
          <span className="text-st-primary">스테디</span>에 오신 걸 환영합니다!
        </div>
        <div className={loginTextStyles}>닉네임을 설정해주세요</div>
      </div>

      <form
        onSubmit={handleSubmit(checkNickname)}
        className="flex h-full flex-col items-center justify-between"
      >
        <div className="flex flex-col items-center justify-center gap-10">
          <input
            className="max-mobile:w-full h-55 w-400 items-center rounded-12 border-2 border-solid border-st-gray-100 pl-5 pr-5 text-center text-lg outline-none"
            type="text"
            {...register("nickname")}
            onChange={(event) => setValue("nickname", event.target.value)}
            placeholder="닉네임을 입력해주세요."
          />
          {errors.nickname?.message && (
            <div className="text-st-red">{errors.nickname?.message}</div>
          )}
        </div>
        {/* TODO: 중복검사 API 연결 */}
        <Button
          className={`${buttonSize.md} bg-st-primary text-st-white`}
          type="submit"
        >
          다음
        </Button>
      </form>
    </div>
  );
};

export default SetNickname;
