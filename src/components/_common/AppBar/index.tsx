"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderLogo from "@/images/headerLogo.svg";
import Logo from "@/images/logo.svg";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/isAuth";
import getMyProfile from "@/services/user/getMyProfile";
import Dropdown from "@/components/_common/Dropdown";
import NotificationPopup from "@/components/_common/NotificationPopup";
import LoginModal from "../Modal/LoginModal";

interface AppBarProps {
  className?: string;
}

export const appBarTextStyles = "text-12 md:text-lg font-bold";

const AppBar = ({ className }: AppBarProps) => {
  const { isAuth } = useAuthStore();
  const [userProfileImageSrc, setUserProfileImageSrc] = useState(Logo);

  useEffect(() => {
    if (isAuth) {
      getMyProfile().then((res) => {
        setUserProfileImageSrc(res.profileImage);
      });
    }
  }, []);

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
      {isAuth && (
        <div className="flex w-150 items-center justify-between sm:w-170 md:w-250">
          <Link href={"/mysteady"}>
            <div className={cn(appBarTextStyles, "w-50 md:w-80")}>
              내 스테디
            </div>
          </Link>
          <NotificationPopup />
          <Dropdown
            options={[
              { label: "마이페이지", linkTo: "/mypage" },
              { label: "로그아웃", linkTo: "/logout" },
            ]}
          >
            <div className="flex h-30 w-30 items-center justify-center md:h-45 md:w-45">
              <Image
                className="rounded-full border-1"
                src={userProfileImageSrc}
                alt="스테디 로고"
                width={45}
                height={45}
              />
            </div>
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
