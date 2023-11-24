"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/themes";
import Button, { buttonSize } from "@/components/_common/Button";
import { AlertModal } from "@/components/_common/Modal";

const SteadyManageLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const id = path.split("/")[3];
  return (
    <div className="flex w-1000 flex-col">
      <div className="mb-20 flex items-center justify-between">
        {/* TODO: 스테디명 받기 */}
        <div className="text-30 font-bold">{"{스테디명} 운영"} </div>
        <div className="flex gap-20">
          <Link href={`/steady/applicant/${id}`}>
            <Button
              className={`${cn(
                buttonSize.sm,
                "w-130 bg-st-primary text-16 text-st-white",
              )}`}
            >
              신청자 보기
            </Button>
          </Link>
          <AlertModal
            trigger={
              <Button
                className={`${cn(
                  buttonSize.sm,
                  "w-130 bg-st-red text-16 text-st-white",
                )}`}
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
      {children}
    </div>
  );
};

export default SteadyManageLayout;
