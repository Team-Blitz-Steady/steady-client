import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  type PositionAndStacksSchemaType,
  positionAndStacksSchema,
} from "@/schemas/setNickname";
import useLoginStepsStore from "@/stores/loginSteps";
import useNewUserInfoStore from "@/stores/newUserInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import getPositions from "@/services/steady/getPositions";
import getStacks from "@/services/steady/getStacks";
import Button, { buttonSize } from "@/components/_common/Button";
import { MultiSelector, SingleSelector } from "@/components/_common/Selector";
import { extractValue } from "@/utils/extractValue";
import { loginTextStyles } from "./SetNickname";

const SetPositionAndStacks = () => {
  const { setIncreaseSteps } = useLoginStepsStore();
  const { nickname, positionId, stacksId, setPositionId, setStackIds } =
    useNewUserInfoStore();
  const userInfos = useForm<PositionAndStacksSchemaType>({
    values: { positionId: positionId, stacksId: stacksId },
    resolver: zodResolver(positionAndStacksSchema),
  });
  const { data: stacksData } = useSuspenseQuery({
    queryKey: ["stacks"],
    queryFn: () => getStacks(),
    staleTime: Infinity,
  });
  const { data: positionsData } = useSuspenseQuery({
    queryKey: ["positions"],
    queryFn: () => getPositions(),
    staleTime: Infinity,
  });

  const savePositionAndStacks = (data: PositionAndStacksSchemaType) => {
    setPositionId(data.positionId);
    setStackIds(data.stacksId);
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
              name={"positionId"}
              render={() => (
                <FormItem className="flex flex-col gap-10">
                  <SingleSelector
                    initialLabel={
                      positionsData.positions.find(
                        (position) => position.id === positionId,
                      )?.name ?? "포지션"
                    }
                    items={positionsData.positions.map((position) => ({
                      value: position.id.toString(),
                      label: position.name,
                    }))}
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
                name={"stacksId"}
                render={() => (
                  <FormItem className="flex flex-col gap-10">
                    <MultiSelector
                      initialLabel={
                        stacksId.length
                          ? stacksData.stacks
                              .filter((item) => stacksId.includes(item.id))
                              .map((item) => item.name)
                              .join(", ")
                          : "기술 스택"
                      }
                      items={stacksData.stacks.map((stack) => ({
                        value: stack.id.toString(),
                        label: stack.name,
                      }))}
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
