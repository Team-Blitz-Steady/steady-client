"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderLogo from "@/images/headerLogo.svg";
import Logo from "@/images/logo.svg";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/isAuth";
import Dropdown from "@/components/_common/Dropdown";
import NotificationPopup from "@/components/_common/NotificationPopup";
import LoginModal from "../Modal/LoginModal";

interface AppBarProps {
  className?: string;
}

export const appBarTextStyles = "text-lg font-bold";

const AppBar = ({ className }: AppBarProps) => {
  const { isAuth } = useAuthStore();

  return (
    <div
      className={cn(
        "flex items-center justify-between py-30 md:w-5/6 xl:w-1120",
        className,
      )}
    >
      <Link href={"/"}>
        <Image
          src={HeaderLogo}
          alt="스테디 로고"
          width={150}
          height={70}
        />
      </Link>
      {isAuth && (
        <div className="flex w-250 items-center justify-between">
          <Link href={"/mysteady"}>
            <div className={cn(appBarTextStyles, "w-80")}>내 스테디</div>
          </Link>
          <NotificationPopup />
          <Dropdown
            options={[
              { label: "마이페이지", linkTo: "/mypage" },
              { label: "로그아웃", linkTo: "/logout" },
            ]}
          >
            <Image
              className="rounded-full border-1"
              src={Logo}
              alt="스테디 로고"
              width={45}
              height={45}
            />
          </Dropdown>
        </div>
      )}
      <LoginModal
        trigger={
          !isAuth && (
            <div className={`${appBarTextStyles} cursor-pointer`}>로그인</div>
          )
        }
      />
    </div>
  );
};

export default AppBar;
