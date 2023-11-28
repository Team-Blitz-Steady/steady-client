"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import CopyRightLogo from "@/images/CopyRightLogo.svg";
import { cn } from "@/lib/utils";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer
      className={`${cn(
        "-bottom-30 h-250 w-screen items-center justify-evenly bg-st-gray-50 py-100",
        pathname === "/" ? "" : "hidden",
      )}`}
    >
      <Image
        src={CopyRightLogo}
        alt="CopyRight 이미지"
        width={200}
        height={100}
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
