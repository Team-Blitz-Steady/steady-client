import type { PropsWithChildren } from "react";
import { Separator } from "@radix-ui/themes";

interface TitleProps {
  title: string;
  pageType?: string;
}

const Title = ({
  children,
  title,
  pageType,
}: PropsWithChildren<TitleProps>) => {
  return (
    <>
      <div className="flex flex-row items-center gap-10 text-30 font-bold">
        <div className="text-25 text-st-primary lg:text-28 xl:text-30">
          {title}
        </div>
        <span className="text-25 lg:text-28 xl:text-30">
          {pageType === "submit" ? "신청서" : "신청서 수정"}
        </span>
      </div>
      <Separator className="mb-10 h-5 w-auto bg-st-gray-400" />
      <div className="flex h-600 flex-col gap-30 overflow-y-scroll px-100 max-sm:px-50 sm:px-50 md:px-70">
        {children}
      </div>
      <Separator className="mt-10 h-5 w-auto bg-st-gray-400" />
    </>
  );
};

export default Title;
