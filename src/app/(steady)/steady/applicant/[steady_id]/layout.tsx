"use client";

import type { ReactNode } from "react";
import { Fragment, Suspense, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Image from "next/image";
import Link from "next/link";
import { UserModal } from "@/components/_common/Modal";
import UserItems from "@/components/_common/Modal/UserModal/UserItems";
import Spinner from "@/components/_common/Spinner";
import useApplicantListQuery from "@/hooks/query/useApplicantListQuery";

const selectedEffectStyle = "bg-st-skyblue-50 text-st-primary";
const normalEffectStyle = "hover:bg-st-gray-50";

const SteadyApplicantLayout = ({
  params,
  children,
}: {
  params: { steady_id: string };
  children: ReactNode;
}) => {
  const steadyId = params.steady_id;
  const [selectedItem, setSelectedItem] = useState(0);
  const { applicantListData, hasNextPage, fetchNextPage } =
    useApplicantListQuery({ steadyId });

  const applicantList = applicantListData.pages.flatMap((page) => page.content);

  return (
    <>
      <div className="w-fit">
        <InfiniteScroll
          hasMore={hasNextPage}
          loadMore={() => fetchNextPage()}
          useWindow={false}
          className="flex h-650 flex-col items-center gap-10 overflow-y-auto overflow-x-hidden rounded-20 border-1 border-solid border-st-gray-100 p-20 scrollbar-hide max-sm:w-150 sm:w-150 md:w-180 lg:w-200 xl:w-250"
        >
          {applicantList.map((user, id) => (
            <Fragment key={user.userId}>
              <div
                className={`flex items-center gap-10 rounded-5 p-15 text-18 font-bold transition duration-100 max-sm:w-120 sm:w-120 md:w-140 lg:w-170 xl:w-220 ${
                  selectedItem === id ? selectedEffectStyle : normalEffectStyle
                }`}
                onClick={() => setSelectedItem(id)}
              >
                <UserModal
                  trigger={
                    <div>
                      <Image
                        className="cursor-pointer rounded-full border-1"
                        src={user.profileImage}
                        alt="유저 프로필 이미지"
                        width={50}
                        height={50}
                      />
                    </div>
                  }
                >
                  <Suspense fallback={<Spinner size="large" />}>
                    <UserItems userId={user.userId} />
                  </Suspense>
                </UserModal>
                <Link
                  href={`/steady/applicant/${steadyId}/${user.applicationId}`}
                  className="w-full"
                >
                  <span className="line-clamp-1 max-sm:text-12 sm:text-14 md:text-16 lg:text-18 xl:text-20">
                    {user.nickname}
                  </span>
                </Link>
              </div>
            </Fragment>
          ))}
        </InfiniteScroll>
      </div>
      {children}
    </>
  );
};

export default SteadyApplicantLayout;
