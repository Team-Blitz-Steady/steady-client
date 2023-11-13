"use client";

import { type ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SteadyLogo from "@/images/turtle.png";
import { Separator } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import changeApplicationStatus from "@/services/application/changeApplicationStatus";
import getApplicationsList from "@/services/application/getApplicationsList";
import Button, { buttonSize } from "@/components/_common/Button";
import { AlertModal } from "@/components/_common/Modal";

const selectedEffectStyle = "bg-st-skyblue-50 text-st-primary";
const normalEffectStyle = "hover:bg-st-gray-50";

const ApplicantLayout = ({ children }: { children: ReactNode }) => {
  const id = usePathname().split("/").pop();
  const [selectedItem, setSelectedItem] = useState(0);
  const { data: applicationsListData } = useQuery({
    queryKey: ["applicationsList"],
    queryFn: () => getApplicationsList(id as string), // 스테디 id
  });

  return (
    <div className="flex w-full flex-col gap-30">
      <div className="text-30 font-bold">신청자 목록</div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
      <div className="flex w-full flex-row gap-30">
        <div className="w-fit">
          <div className="flex h-900 w-250 flex-col items-center gap-15 overflow-y-auto overflow-x-hidden rounded-20 border-1 border-solid border-st-gray-100 p-20">
            {applicationsListData?.content.map((user, id) => (
              <div key={id}>
                {/* TODO: 유저 프로필 이미지 */}

                <div
                  className={`flex w-200 items-center gap-10 rounded-5 p-20 text-18 font-bold transition duration-100 ${
                    selectedItem === id
                      ? selectedEffectStyle
                      : normalEffectStyle
                  }`}
                  onClick={() => setSelectedItem(id)}
                >
                  <Image
                    src={`${user.profileImage}` || SteadyLogo}
                    alt="유저 프로필 이미지"
                    width={50}
                    height={50}
                    className="rounded-full border-1"
                  />
                  <Link
                    href={`/steady/applicant/${user.id}`}
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
      </div>
      <Separator className="h-5 w-auto bg-st-gray-400" />

      <div className="flex justify-end gap-10">
        <AlertModal
          trigger={
            <Button className={`${buttonSize.sm} bg-st-red text-st-white`}>
              거절
            </Button>
          }
          actionButton={
            <Button
              className={`${buttonSize.sm} bg-st-red text-st-white`}
              onClick={() =>
                id &&
                changeApplicationStatus(id, {
                  status: "REJECTED",
                })
              }
            >
              거절
            </Button>
          }
        >
          <div className="text-18 font-bold">거절 하시겠습니까?</div>
        </AlertModal>
        <AlertModal
          trigger={
            <Button className={`${buttonSize.sm} bg-st-green text-st-white`}>
              승인
            </Button>
          }
          actionButton={
            <Button
              className={`${buttonSize.sm} bg-st-green text-st-white`}
              onClick={() =>
                id &&
                changeApplicationStatus(id, {
                  status: "ACCEPTED",
                })
              }
            >
              승인
            </Button>
          }
        >
          <div className="text-18 font-bold">승인 하시겠습니까?</div>
        </AlertModal>
      </div>
    </div>
  );
};

export default ApplicantLayout;
