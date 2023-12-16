"use client";

import InfiniteScroll from "react-infinite-scroller";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/themes";
import Icon from "@/components/_common/Icon";
import Title from "@/components/_common/Title";
import EmptySteady from "@/components/containers/mysteady/EmptySteady";
import Steadies from "@/components/containers/mysteady/Steadies";
import SteadyFilter from "@/components/containers/mysteady/SteadyFilter";
import { filterOptions } from "@/components/containers/mysteady/constants";
import { useMySteadiesQuery } from "@/hooks/query/useMySteadiesQuery";
import { useScrollTo } from "@/hooks/useScrollTo";

const MySteadyPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("status") ?? undefined;
  const { mySteadyData, fetchNextPage, hasNextPage } = useMySteadiesQuery({
    status: search,
    direction: "desc",
  });
  const ref = useScrollTo<HTMLDivElement>({ top: 0 }, [search]);

  return (
    <div className="flex flex-col max-sm:w-400 sm:w-500 md:w-600 lg:w-800 xl:w-1000">
      <div className="flex items-center justify-between">
        <Title title={"내 스테디 목록"} />
        <SteadyFilter
          title={"필터"}
          options={filterOptions}
        >
          <Icon
            name="chevron-down"
            size={20}
            color=""
          />
        </SteadyFilter>
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
              <div
                key={pageIndex}
                className="flex w-full flex-col gap-5"
              >
                {steadies.content.map((steady, steadyIndex) => (
                  <div
                    key={`${pageIndex}-${steadyIndex}`}
                    className={cn(
                      "flex min-h-140 w-full cursor-pointer items-center justify-between border-b-1 border-st-gray-200 transition hover:scale-105 hover:bg-st-gray-50 max-sm:px-20 sm:px-20 md:px-30 lg:px-50 xl:px-50",
                    )}
                  >
                    <Steadies
                      steady={steady}
                      search={search}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="flex h-1000 flex-col items-center justify-center gap-20 text-30 font-bold"
                key={`${pageIndex}`}
              >
                <EmptySteady search={search} />
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
