"use client";

import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/images/logo.png";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/isAuth";
import { Avatar } from "@radix-ui/themes";
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
          src={LogoImage}
          alt="스테디 로고"
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
            <Avatar
              radius={"full"}
              fallback={<div>?</div>}
              src={"/images/steadyturtle.png"}
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
