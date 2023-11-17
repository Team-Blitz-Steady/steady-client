"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import LogoImage from "@/images/logo.png";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/isAuth";
import { BellIcon } from "@radix-ui/react-icons";
import { Avatar, Separator } from "@radix-ui/themes";
import Dropdown from "@/components/_common/Dropdown";
import LoginModal from "../Modal/LoginModal";

interface AppBarProps {
  className?: string;
}

const notifications = Array.from({ length: 10 }, (_, i) => `Notification ${i}`);

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
            <div className={appBarTextStyles}>내 스테디</div>
          </Link>
          <Popover>
            <PopoverTrigger>
              <BellIcon
                width={25}
                height={25}
              />
            </PopoverTrigger>
            <PopoverContent className={"h-300"}>
              <ScrollArea className={"h-full w-full rounded-md"}>
                <div className="px-4">
                  <h4 className="mb-16 text-20 font-semibold leading-none">
                    알림 목록
                  </h4>
                  {notifications.map((content, idx) => (
                    <div
                      className={"justify-center py-10"}
                      key={idx}
                    >
                      <div className="text-md pb-15">{content}</div>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
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
