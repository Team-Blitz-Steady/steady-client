import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import type { NicknameSchemaType } from "@/schemas/setNickname";
import { nicknameSchema } from "@/schemas/setNickname";
import useLoginStepsStore from "@/stores/loginSteps";
import useNewUserInfoStore from "@/stores/newUserInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import checkSameNickname from "@/services/user/checkSameNickname";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";

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
  } = useForm<NicknameSchemaType>({
    mode: "onChange",
    resolver: zodResolver(nicknameSchema),
  });
  const { toast } = useToast();
  const [activeNextBtn, setActiveNextBtn] = useState(false);

  useEffect(() => {
    setValue("nickname", nickname);
  }, [nickname, setValue]);

  const handleCheckSameNickname = async () => {
    const watchNickname = watch("nickname");
    const isError = errors["nickname"];
    if (isError) {
      setActiveNextBtn(false);
      return;
    }
    const { exist } = await checkSameNickname(watchNickname);
    if (exist) {
      setActiveNextBtn(false);
      toast({
        description: "이미 사용중인 닉네임입니다!",
        variant: "red",
      });
    } else {
      setNickname(watchNickname);
      toast({
        description: "사용 가능한 닉네임입니다!",
        variant: "green",
      });
      setActiveNextBtn(true);
    }
  };

  const handleNextStep = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (activeNextBtn) {
      setIncreaseSteps();
    }
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
        onSubmit={handleSubmit(handleCheckSameNickname)}
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
          <button
            onClick={handleCheckSameNickname}
            type="submit"
          >
            <Icon
              name="check"
              size={20}
              color=""
            />
          </button>
        </div>
        <Button
          className={`${buttonSize.md}  text-st-white ${
            activeNextBtn ? "bg-st-primary" : "bg-st-gray-100"
          }`}
          type="button"
          onClick={handleNextStep}
          disabled={!activeNextBtn}
        >
          다음
        </Button>
      </form>
    </div>
  );
};

export default SetNickname;
