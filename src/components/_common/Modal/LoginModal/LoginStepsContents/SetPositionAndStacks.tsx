import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  type PositionAndStacksSchemaType,
  positionAndStacksSchema,
} from "@/schemas/setNickname";
import useLoginStepsStore from "@/stores/loginSteps";
import useNewUserInfoStore from "@/stores/newUserInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import Button, { buttonSize } from "@/components/_common/Button";
import { MultiSelector, SingleSelector } from "@/components/_common/Selector";
import { extractValue } from "@/utils/extractValue";
import {
  steadyExpectedTechStacks,
  steadyRecruitmentFields,
} from "@/constants/create-steady";
import { loginTextStyles } from "./SetNickname";

const SetPositionAndStacks = () => {
  const { setIncreaseSteps } = useLoginStepsStore();
  const { nickname, positionId, stacksId, setPositionId, setStackIds } =
    useNewUserInfoStore();
  const userInfos = useForm<PositionAndStacksSchemaType>({
    values: { position: positionId, stacks: stacksId },
    resolver: zodResolver(positionAndStacksSchema),
  });

  const savePositionAndStacks = (data: PositionAndStacksSchemaType) => {
    setPositionId(data.position);
    setStackIds(data.stacks);
    setIncreaseSteps();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly px-10">
      <div className="flex h-full flex-col items-center justify-center gap-10 text-center">
        <div className={loginTextStyles}>
          <div className="mb-20">멋진 닉네임 이네요!</div>
          <div>
            <div>{`"${nickname}"님의 `}</div>
            <span className="text-st-primary">포지션</span>
            <span>과</span>
            <span className="text-st-primary"> 기술 스택</span>을 알려주세요!
          </div>
        </div>
      </div>
      <Form {...userInfos}>
        <form
          onSubmit={userInfos.handleSubmit(savePositionAndStacks)}
          className="flex h-full w-full flex-col items-center px-30"
        >
          <div className="flex h-full w-full flex-col gap-20 text-center">
            <FormField
              control={userInfos.control}
              name={"position"}
              render={() => (
                <FormItem className="flex flex-col gap-10">
                  <SingleSelector
                    initialLabel={
                      steadyRecruitmentFields.find(
                        (position) => position.value === String(positionId),
                      )?.label ?? "포지션"
                    }
                    items={steadyRecruitmentFields}
                    onSelectedChange={(selected) => {
                      setPositionId(Number(selected));
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-130 overflow-auto scrollbar-hide">
              <FormField
                control={userInfos.control}
                name={"stacks"}
                render={() => (
                  <FormItem className="flex flex-col gap-10">
                    <MultiSelector
                      initialLabel={
                        stacksId.length
                          ? steadyExpectedTechStacks
                              .filter((item) =>
                                stacksId.includes(Number(item.value)),
                              )
                              .map((item) => item.label)
                              .join(", ")
                          : "기술 스택"
                      }
                      items={steadyExpectedTechStacks}
                      onSelectedChange={(selected) => {
                        const stacksId = extractValue(selected).map(Number);
                        setStackIds(stacksId);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            className={`${buttonSize.md} min-h-50 bg-st-primary text-st-white`}
            type="submit"
          >
            다음
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SetPositionAndStacks;
