"use client";

import Link from "next/link";
import { Separator } from "@radix-ui/themes";
import Button, { buttonSize } from "@/components/_common/Button";
import { AlertModal } from "@/components/_common/Modal";
import SideBar from "@/components/_common/SideBar";

const manageItems = [
  {
    label: "스테디 멤버 관리",
    href: "/steady/manage/1/members",
  },
  {
    label: "스테디 퀴즈",
    href: "/steady/manage/1/quiz",
  },
  {
    label: "스테디 공지",
    href: "/steady/manage/1/notice",
  },
];

const SteadyManageLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const id = path.split("/")[3];
  return (
    <div className="flex w-full flex-col">
      <div className="mb-20 flex items-center justify-between">
        {/* TODO: 스테디명 받기 */}
        <div className="text-30 font-bold">{"{스테디명} 운영"} </div>
        <div className="flex gap-20">
          <Link href={`/steady/applicant/${id}`}>
            <Button
              className={`${buttonSize.md} bg-st-primary text-16 text-st-white`}
            >
              신청자 보기
            </Button>
          </Link>
          <AlertModal
            trigger={
              <Button
                className={`${buttonSize.md} bg-st-red text-16 text-st-white`}
              >
                스테디 종료
              </Button>
            }
            actionButton={
              <Button
                className={`${buttonSize.sm} bg-st-red text-16 text-st-white`}
              >
                종료
              </Button>
            }
          >
            <div className="text-18 font-bold">
              정말 스테디를 종료하겠습니까?
            </div>
          </AlertModal>
        </div>
      </div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
      <div className="flex w-full flex-row gap-30 py-30">
        <div className="w-fit">
          <SideBar
            listType="manage"
            sidebarItems={manageItems}
          />
        </div>
        {children}
      </div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
    </div>
  );
};

export default SteadyManageLayout;
