"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderLogo from "@/images/headerLogo.svg";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/isAuth";
import LoginModal from "../Modal/LoginModal";
import AuthAppBar from "./AuthAppBar";

interface AppBarProps {
  className?: string;
}

export const appBarTextStyles = "text-12 md:text-lg font-bold";

const AppBar = ({ className }: AppBarProps) => {
  const { isAuth } = useAuthStore();

  return (
    <div
      className={cn(
        "flex w-5/6 items-center justify-between py-20 md:py-30 xl:w-1120",
        className,
      )}
    >
      <Link href={"/"}>
        <div className="w-100 md:w-150">
          <Image
            src={HeaderLogo}
            alt="스테디 로고"
            layout="full"
          />
        </div>
      </Link>
      {isAuth ? (
        <AuthAppBar />
      ) : (
        <LoginModal
          trigger={
            <div className={`${appBarTextStyles} cursor-pointer`}>로그인</div>
          }
        />
      )}
    </div>
  );
};

export default AppBar;
