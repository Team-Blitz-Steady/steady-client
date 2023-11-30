"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TabBar = () => {
  const path = usePathname();

  console.log(path);

  return (
    <div className="flex h-41 justify-between gap-20 border-b-3 border-st-gray-100 sm:h-47 md:hidden">
      <Link href={"/mypage"}>
        <div
          className={`${
            path === "/mypage" && "border-b-3 border-st-primary text-st-primary"
          } p-10 text-12 font-bold text-st-gray-100 sm:text-16`}
        >
          내 프로필
        </div>
      </Link>
      <Link href={"/mypage/template"}>
        <div
          className={`${
            path.split("/")[2] === "template" &&
            "border-b-3 border-st-primary text-st-primary"
          } p-10 text-12 font-bold text-st-gray-100 sm:text-16`}
        >
          내 템플릿
        </div>
      </Link>
      <Link href={"/mypage/application"}>
        <div
          className={`${
            path === "/mypage/application" &&
            "border-b-3 border-st-primary text-st-primary"
          } p-10 text-12 font-bold text-st-gray-100 sm:text-16`}
        >
          내 신청서 관리
        </div>
      </Link>
      <Link href={"/mypage/reviews"}>
        <div
          className={`${
            path === "/mypage/reviews" &&
            "border-b-3 border-st-primary text-st-primary"
          } p-10 text-12 font-bold text-st-gray-100 sm:text-16`}
        >
          내가 받은 리뷰
        </div>
      </Link>
    </div>
  );
};

export default TabBar;
