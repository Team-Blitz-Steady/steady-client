import { type ReactNode } from "react";
import { Separator } from "@radix-ui/themes";

const ApplicantLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-10 max-sm:w-400 sm:w-500 md:w-600 lg:w-800 xl:w-1000">
      <div className="text-25 font-bold lg:text-30">신청자 목록</div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
      <div className="flex h-650 w-full flex-row gap-30">{children}</div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
    </div>
  );
};

export default ApplicantLayout;
