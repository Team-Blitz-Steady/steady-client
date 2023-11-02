import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/themes";
import Icon from "@/components/_common/Icon";
import { SingleSelector } from "@/components/_common/Selector";

const steadyInfo = [
  {
    title: "리더인 스터디임",
    createdAt: "2023.10.25",
    isLeader: true,
    isParticipated: true,
    isSubmitted: false,
    isEnded: false,
  },
  {
    title: "참여한 스터디임",
    createdAt: "2023.10.25",
    isLeader: false,
    isParticipated: true,
    isSubmitted: false,
    isEnded: false,
  },
  {
    title: "신청한 스터디임",
    createdAt: "2023.10.25",
    isLeader: false,
    isParticipated: false,
    isSubmitted: true,
    isEnded: false,
  },
  {
    title: "종료된 스터디임",
    createdAt: "2023.10.25",
    isLeader: false,
    isParticipated: true,
    isSubmitted: false,
    isEnded: true,
  },
  {
    title: "신청한 스터디임",
    createdAt: "2023.10.25",
    isLeader: false,
    isParticipated: false,
    isSubmitted: true,
    isEnded: false,
  },
  {
    title: "종료된 스터디임",
    createdAt: "2023.10.25",
    isLeader: false,
    isParticipated: true,
    isSubmitted: false,
    isEnded: true,
  },
  {
    title: "신청한 스터디임",
    createdAt: "2023.10.25",
    isLeader: false,
    isParticipated: true,
    isSubmitted: true,
    isEnded: false,
  },
  {
    title: "종료된 스터디임",
    createdAt: "2023.10.25",
    isLeader: false,
    isParticipated: true,
    isSubmitted: false,
    isEnded: true,
  },
];

const filter = [
  {
    value: "all",
    label: "전체",
  },
  {
    value: "participated",
    label: "참여",
  },
  {
    value: "application",
    label: "신청",
  },
  {
    value: "ended",
    label: "종료",
  },
];

// TODO: 무한 스크롤
const MySteadyPage = () => {
  const renderIcon = ({
    isEnded,
    isParticipated,
    isSubmitted,
    isLeader,
  }: {
    isLeader: boolean;
    isEnded: boolean;
    isParticipated: boolean;
    isSubmitted: boolean;
  }) => {
    if (isEnded) {
      return <div className="h-20 w-20" />;
    }
    if (isParticipated) {
      return isLeader ? (
        <div>
          <Icon
            name="gear"
            size={20}
            color=""
          />
        </div>
      ) : (
        <Icon
          name="exit"
          size={20}
          color=""
        />
      );
    }
    if (isSubmitted) {
      return (
        <Icon
          name="cross"
          size={20}
          color=""
        />
      );
    }
    return <div className="h-20 w-20" />;
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <div className="min-w-fit px-40 py-20 text-30 font-bold">
          내 스테디 목록
        </div>
        <SingleSelector
          items={filter}
          className="h-45 w-110 border-2 text-25 font-bold"
          initialLabel="필터"
        />
      </div>

      <Separator className="h-5 w-full bg-st-gray-400" />
      <div className="flex h-750 w-full flex-col overflow-y-scroll">
        {steadyInfo.map((steady, id) => (
          <>
            <div
              key={id}
              className={cn(
                "flex h-140 w-full cursor-pointer items-center justify-between border-b-1 border-st-gray-200 p-50",
              )}
            >
              <div
                className={`text-black text-25 font-bold ${
                  steady.isEnded ? "text-st-gray-100 line-through" : ""
                }`}
              >
                {steady.title}
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center gap-30">
                  <div className="text-bold text-15 text-st-gray-100">
                    생성일 {steady.createdAt}
                  </div>
                  <>{renderIcon(steady)}</>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      <Separator className="h-5 w-full bg-st-gray-400" />
    </div>
  );
};

export default MySteadyPage;
