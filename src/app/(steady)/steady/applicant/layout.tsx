import { type ReactNode } from "react";
import { Separator } from "@radix-ui/themes";

const ApplicantLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-1000 flex-col gap-30">
      <div className="text-30 font-bold">신청자 목록</div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
      <div className="flex w-full flex-row gap-30">{children}</div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
    </div>
  );
};

export default ApplicantLayout;
