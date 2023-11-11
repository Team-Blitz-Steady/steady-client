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
import { loginTextStyles } from "./SetNickname";

const dummyPositions = [
  { value: "1", label: "프론트엔드" },
  { value: "2", label: "백엔드" },
  { value: "3", label: "디자인" },
  { value: "4", label: "기획" },
  { value: "5", label: "마케팅" },
  { value: "6", label: "기타" },
];

const dummyStacks = [
  { value: "1", label: "React" },
  { value: "2", label: "Next.js" },
  { value: "3", label: "Vue" },
  { value: "4", label: "Nuxt.js" },
  { value: "5", label: "Angular" },
  { value: "6", label: "Svelte" },
  { value: "7", label: "Express" },
  { value: "8", label: "Nest.js" },
  { value: "9", label: "Django" },
  { value: "10", label: "Flask" },
  { value: "11", label: "Spring" },
  { value: "12", label: "MyBatis" },
  { value: "13", label: "JPA" },
  { value: "14", label: "Hibernate" },
  { value: "15", label: "MySQL" },
  { value: "16", label: "MariaDB" },
];

const SetPositionAndStacks = () => {
  const { setIncreaseSteps } = useLoginStepsStore();
  const { nickname, positionId, stackIds, setPositionId, setStackIds } =
    useNewUserInfoStore();
  const userInfos = useForm<PositionAndStacksSchemaType>({
    values: { position: positionId, stacks: stackIds },
    resolver: zodResolver(positionAndStacksSchema),
  });

  const savePositionAndStacks = (data: PositionAndStacksSchemaType) => {
    setPositionId(data.position);
    setStackIds(data.stacks);
    setIncreaseSteps();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
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
          className="flex h-full w-full flex-col items-center justify-between px-30"
        >
          <div className="flex h-full w-full flex-col gap-20 text-center">
            <FormField
              control={userInfos.control}
              name={"position"}
              render={() => (
                <FormItem className="flex flex-col gap-10">
                  <SingleSelector
                    initialLabel={
                      dummyPositions.find(
                        (position) => position.value === String(positionId),
                      )?.label ?? "포지션"
                    }
                    items={dummyPositions}
                    onSelectedChange={(selected) => {
                      setPositionId(Number(selected));
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-full overflow-auto scrollbar-hide">
              <FormField
                control={userInfos.control}
                name={"stacks"}
                render={() => (
                  <FormItem className="flex flex-col gap-10">
                    <MultiSelector
                      initialLabel={
                        stackIds.length
                          ? dummyStacks
                              .filter((item) =>
                                stackIds.includes(Number(item.value)),
                              )
                              .map((item) => item.label)
                              .join(", ")
                          : "기술 스택"
                      }
                      items={dummyStacks}
                      onSelectedChange={(selected) => {
                        const stackIds = extractValue(selected).map(Number);
                        setStackIds(stackIds);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            className={`${buttonSize.md}  bg-st-primary text-st-white`}
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
