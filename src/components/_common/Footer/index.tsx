"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import CopyRight from "@/images/copyright.svg";
import { cn } from "@/lib/utils";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer
      className={`${cn(
        "-bottom-30 flex h-250 w-screen items-center justify-evenly bg-st-gray-50",
        pathname === "/" ? "" : "hidden",
      )}`}
    >
      <Image
        src={CopyRight}
        alt="CopyRight"
        width={300}
        height={200}
      />
      <div className="flex items-center justify-center gap-50">
        <div className="font-bold">이용약관</div>
        <div className="font-bold">개인정보처리방침</div>
        <div className="font-bold">서비스 소개</div>
      </div>
    </footer>
  );
};

export default Footer;
