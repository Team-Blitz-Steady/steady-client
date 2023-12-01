"use client";

import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/themes";
import { format } from "date-fns";
import type { MySteadyContentType } from "@/services/types";
import Button, { buttonSize } from "@/components/_common/Button";
import ContactTag from "@/components/_common/ContactTag";
import Dropdown from "@/components/_common/Dropdown";
import Icon from "@/components/_common/Icon";
import { AlertModal } from "@/components/_common/Modal";
import { useMySteadiesQuery } from "@/hooks/query/useMySteadiesQuery";
import { useScrollTo } from "@/hooks/useScrollTo";

const filterOptions = [
  {
    label: "전체",
    linkTo: "/mysteady",
  },
  {
    label: "참여",
    linkTo: "/mysteady?status=recruiting",
  },
  {
    label: "종료",
    linkTo: "/mysteady?status=finished",
  },
];

const MySteadyPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("status") ?? undefined;
  const { mySteadyData, fetchNextPage, hasNextPage } = useMySteadiesQuery({
    status: search,
    direction: "desc",
  });
  const ref = useScrollTo<HTMLDivElement>({ top: 0 }, [search]);

  const renderIcon = (steady: MySteadyContentType) => {
    if (search === "finished") {
      return <div className="h-20 w-20" />;
    }
    if (steady.isLeader && search !== "finished") {
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
    }
    if (!steady.isLeader && (search === "recruiting" || search === "closed")) {
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
            <div className="text-18 font-bold">정말 탈퇴하시겠습니까?</div>
          </div>
        </AlertModal>
      );
    }
  };

  const emptySteadiesMessage = () => {
    switch (search) {
      case "finished":
        return "종료된 ";
      case "recruiting" || "closed":
        return "참여중인 ";
      default:
        return "참여중이거나 종료된";
    }
  };

  return (
    <div className="flex flex-col max-sm:w-400 sm:w-500 md:w-600 lg:w-800 xl:w-1000">
      <div className="flex items-center justify-between">
        <div className="min-w-fit px-40 py-20 font-bold sm:text-20 md:text-25 lg:text-30">
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
      <div
        ref={ref}
        className="h-650 overflow-y-auto overflow-x-hidden"
      >
        <InfiniteScroll
          className="flex h-full w-full flex-col"
          hasMore={hasNextPage}
          loadMore={() => fetchNextPage()}
          useWindow={false}
        >
          {mySteadyData.pages.map((steadies, pageIndex) =>
            steadies.content.length ? (
              <Fragment key={pageIndex}>
                {steadies.content.map((steady, steadyIndex) => (
                  <div
                    key={`${pageIndex}-${steadyIndex}`}
                    className={cn(
                      "flex min-h-140 w-full cursor-pointer items-center justify-between border-b-1 border-st-gray-200 hover:bg-st-gray-50 max-sm:px-20 sm:px-20 md:px-30 lg:px-50 xl:px-50",
                    )}
                  >
                    <Link
                      href={`/steady/detail/${steady.steadyId}`}
                      className="flex h-full w-fit flex-grow"
                    >
                      <div className="text-black flex w-full items-center text-center font-bold sm:text-15 md:text-20 lg:text-25">
                        {steady.isLeader
                          ? `👑 ${steady.name}`
                          : `${steady.name}`}
                      </div>
                    </Link>
                    <div className="flex items-center justify-center gap-20">
                      <ContactTag contactUrl={steady.contact} />
                      <div className="text-bold max-w-fit text-15 text-st-gray-100 max-sm:hidden">
                        {steady.isLeader ? "생성일: " : "참여일: "}
                        {format(new Date(steady.joinedAt), "yyyy.MM.dd")}
                      </div>
                      {renderIcon(steady)}
                    </div>
                  </div>
                ))}
              </Fragment>
            ) : (
              <div
                className="flex h-1000 flex-col items-center justify-center gap-20 text-30 font-bold"
                key={`${pageIndex}`}
              >
                <div>
                  {emptySteadiesMessage()}
                  스테디가 없습니다.
                </div>
                <Link href="/steady/create">
                  <Button className="h-50 w-200 bg-st-primary text-20 text-st-white">
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
