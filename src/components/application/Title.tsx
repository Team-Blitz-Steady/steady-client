import type { PropsWithChildren } from "react";
import { Separator } from "@radix-ui/themes";

interface TitleProps {
  title: string;
  pageType: string;
}

const Title = ({
  children,
  title,
  pageType,
}: PropsWithChildren<TitleProps>) => {
  return (
    <>
      <div className="flex flex-row items-center gap-10 text-30 font-bold">
        <div className=" text-st-primary">{title}</div>
        {pageType === "submit" ? "참여 신청서" : "참여 신청서 수정"}
      </div>
      <Separator className="st-gray-400 h-3 w-auto" />
      <div className="flex flex-col gap-30 px-100">{children}</div>
      <Separator className="st-gray-400 h-3 w-auto" />
    </>
  );
};

export default Title;