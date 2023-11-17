"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import SteadyLogo from "@/images/turtle.png";
import { Avatar } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import getApplicationsList from "@/services/application/getApplicationsList";

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
  const { data: applicationsListData } = useSuspenseQuery({
    queryKey: ["applicationsList", steadyId],
    queryFn: () => getApplicationsList(steadyId),
    staleTime: 10000,
  });

  return (
    <>
      <div className="w-fit">
        <div className="flex h-900 w-250 flex-col items-center gap-15 overflow-y-auto overflow-x-hidden rounded-20 border-1 border-solid border-st-gray-100 p-20">
          {applicationsListData.content.map((user, id) => (
            <div key={id}>
              <div
                className={`flex w-200 items-center gap-10 rounded-5 p-20 text-18 font-bold transition duration-100 ${
                  selectedItem === id ? selectedEffectStyle : normalEffectStyle
                }`}
                onClick={() => setSelectedItem(id)}
              >
                {/* TODO: 유저 프로필 이미지 클릭시 모달 오픈 */}
                <Avatar
                  src={user.profileImage ? user.profileImage : `/${SteadyLogo}`}
                  alt="유저 프로필 이미지"
                  size={"4"}
                  radius="full"
                  className="cursor-pointer"
                  fallback={""}
                />
                <Link
                  href={`/steady/applicant/${steadyId}/${user.applicationId}`}
                  className="w-full"
                >
                  <div>{user.nickname}</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {children}
    </>
  );
};

export default SteadyApplicantLayout;
