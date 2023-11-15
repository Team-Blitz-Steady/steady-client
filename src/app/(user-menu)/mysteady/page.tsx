"use client";

import InfiniteScroll from "react-infinite-scroller";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/themes";
import { format } from "date-fns";
import type { MySteadyContentType } from "@/services/types";
import Button, { buttonSize } from "@/components/_common/Button";
import Dropdown from "@/components/_common/Dropdown";
import Icon from "@/components/_common/Icon";
import { AlertModal } from "@/components/_common/Modal";
import { useMySteadiesQuery } from "@/hooks/useMySteadiesQuery";

const filterOptions = [
  {
    label: "전체",
    linkTo: "/mysteady",
  },
  {
    label: "참여",
    linkTo: "/mysteady?status=recruiting" || "/mysteady?status=closed",
  },
  {
    label: "종료",
    linkTo: "/mysteady?status=finished",
  },
];

const MySteadyPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("status");
  const { mySteadyData, fetchNextPage, hasNextPage } = useMySteadiesQuery({
    status: search,
    direction: "desc",
  });
  const renderIcon = (search: string, steady: MySteadyContentType) => {
    if (search === "finished") {
      return <div className="h-20 w-20" />;
    }
    if (search === "recruiting" || search === "closed") {
      if (steady.isLeader) {
        return (
          <Dropdown
            options={[
              {
                label: "스테디 수정",
                linkTo: `/steady/edit/${steady.steadyId}`,
              },
              {
                label: "스테디 질문 수정",
                linkTo: `/steady/edit/questions/${steady.steadyId}`,
              },
              {
                label: "스테디 운영",
                linkTo: `/steady/manage/${steady.steadyId}`,
              },
            ]}
          >
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
  };

  const emptySteadiesMessage = (search: string | null) => {
    switch (search) {
      case "finished":
        return "종료된 ";
      case "recruiting" || "closed":
        return "참여중인 ";
      default:
        return "참여중이거나 종료된";
    }
  };

  /*const renderIcon = ({
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
            <div className="font-bold text-20">정말 취소하시겠습니까?</div>
          </div>
        </AlertModal>
      );
    }
  };*/

  return (
    <div className="flex w-1000 flex-col">
      <div className="flex items-center justify-between">
        <div className="min-w-fit px-40 py-20 text-30 font-bold">
          내 스테디 목록
        </div>
        <Dropdown options={filterOptions}>
          <div className="flex gap-10 text-16 text-st-black">
            필터
            <Icon
              name="chevron-down"
              size={20}
              color=""
            />
          </div>
        </Dropdown>
      </div>
      <Separator className="h-5 w-full bg-st-gray-400" />
      <div className="max-h-[1000px] overflow-y-auto scrollbar-hide">
        <InfiniteScroll
          className="flex h-full w-full flex-col"
          hasMore={hasNextPage}
          loadMore={() => fetchNextPage()}
          useWindow={false}
        >
          {mySteadyData.pages.map((steadies, pageIndex) =>
            steadies.content.length ? (
              <>
                {steadies.content.map((steady, steadyIndex) => (
                  <div
                    key={`${pageIndex}-${steadyIndex}`}
                    className={cn(
                      "flex h-140 w-full cursor-pointer items-center justify-between border-b-1 border-st-gray-200 px-50",
                    )}
                  >
                    <Link
                      href={`/steady/detail/${steady.steadyId}`}
                      className="flex h-full w-fit flex-grow"
                    >
                      <div
                        className={`text-black flex items-center justify-center text-center text-25 font-bold ${
                          search === "finished"
                            ? "text-st-gray-100 line-through"
                            : ""
                        }`}
                      >
                        {steady.isLeader
                          ? `👑 ${steady.name}`
                          : `${steady.name}`}
                      </div>
                    </Link>
                    <div className="flex items-center justify-center gap-30">
                      <div className="text-bold max-w-fit text-15 text-st-gray-100">
                        생성일:{" "}
                        {format(new Date(steady.joinedAt), "yyyy.MM.dd p")}
                      </div>
                      {search && renderIcon(search, steady)}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div
                className="flex h-1000 flex-col items-center justify-center gap-20 text-30 font-bold"
                key={`${pageIndex}`}
              >
                <div>
                  {emptySteadiesMessage(search)}
                  스테디가 없습니다.
                </div>
                <Link href="/steady/create">
                  <Button className="h-80 w-250 bg-st-primary text-25 text-st-white">
                    스테디 생성하기
                  </Button>
                </Link>
              </div>
            ),
          )}
        </InfiniteScroll>
      </div>
      <Separator className="h-5 w-full bg-st-gray-400" />
    </div>
  );
};

export default MySteadyPage;
