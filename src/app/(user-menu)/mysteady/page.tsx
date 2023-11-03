import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/themes";
import Button, { buttonSize } from "@/components/_common/Button";
import Dropdown from "@/components/_common/Dropdown";
import Icon from "@/components/_common/Icon";
import { AlertModal } from "@/components/_common/Modal";
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

const configList = [
  {
    label: "스테디 수정",
    linkTo: "/steady/edit/1",
  },
  {
    label: "스테디 질문 수정",
    linkTo: "/steady/edit/questions/1",
  },
  {
    label: "스테디 운영",
    linkTo: "/steady/manage/1",
  },
];

// TODO: 무한 스크롤
// TODO: 필터 적용
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
      if (isLeader) {
        return (
          <Dropdown options={configList}>
            <div className="cursor-pointer">
              <Icon
                name="gear"
                size={20}
                color="text-st-black"
              />
            </div>
          </Dropdown>
        );
      } else {
        return (
          <AlertModal
            trigger={
              <Icon
                name="exit"
                size={20}
                color="text-st-black"
              />
            }
            actionButton={
              <Button className={`${buttonSize.sm} bg-st-red text-st-white`}>
                탈퇴
              </Button>
            }
          >
            <div className="flex items-center justify-center">
              <div className="text-20 font-bold">정말 탈퇴하시겠습니까?</div>
            </div>
          </AlertModal>
        );
      }
    }
    if (isSubmitted) {
      return (
        <AlertModal
          trigger={
            <Icon
              name="cross"
              size={20}
              color="text-st-black"
            />
          }
          actionButton={
            <Button className={`${buttonSize.sm} bg-st-red text-st-white`}>
              네
            </Button>
          }
        >
          <div className="flex items-center justify-center">
            <div className="text-20 font-bold">정말 취소하시겠습니까?</div>
          </div>
        </AlertModal>
      );
    }
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
                {renderIcon(steady)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Separator className="h-5 w-full bg-st-gray-400" />
    </div>
  );
};

export default MySteadyPage;
