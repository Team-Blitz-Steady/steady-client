"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import LogoImage from "@/images/logo.png";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/isAuth";
import {
  BellIcon,
  CheckIcon,
  Cross2Icon,
  FileTextIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Avatar, IconButton, Separator } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import deleteAllNotifications from "@/services/notification/deleteAllNotifications";
import deleteNotification from "@/services/notification/deleteNotification";
import getAllNotifications from "@/services/notification/getAllNotifications";
import readAllNotifications from "@/services/notification/readAllNotifications";
import readNotification from "@/services/notification/readNotification";
import Button from "@/components/_common/Button";
import Dropdown from "@/components/_common/Dropdown";
import Spinner from "@/components/_common/Spinner";
import LoginModal from "../Modal/LoginModal";

interface AppBarProps {
  className?: string;
}

export const appBarTextStyles = "text-lg font-bold";

const AppBar = ({ className }: AppBarProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { isAuth } = useAuthStore();

  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const {
    data: notificationsData,
    isSuccess: notificationsSuccess,
    error: notificationsError,
    refetch: refetchNotifications,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotifications(),
    enabled: isAuth,
  });

  if (notificationsError) {
    console.error(notificationsError);
    refetchNotifications();
  }

  useEffect(() => {
    refetchNotifications();
  }, [pathName]);

  if (!notificationsSuccess) {
    return (
      <div className={"flex h-112 w-full items-center justify-center"}>
        <Spinner size={"medium"} />
      </div>
    );
  }

  const { notifications, freshCount } = notificationsData;

  const handleNavigateTo = (id: string, path: string) => {
    readNotification(id).then(() => {
      refetchNotifications();
      setNotificationMenuOpen(false);
      router.push(path);
    });
  };

  const handleDeleteNotification = (id: string) => {
    deleteNotification(id).then(() => {
      refetchNotifications();
    });
  };

  const handleReadNotification = (id: string) => {
    readNotification(id).then(() => {
      refetchNotifications();
    });
  };

  const handleDeleteAllNotification = () => {
    deleteAllNotifications().then(() => {
      refetchNotifications();
    });
  };

  const handleReadAllNotification = () => {
    readAllNotifications().then(() => {
      refetchNotifications();
    });
  };

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
          <Popover open={notificationMenuOpen}>
            <PopoverTrigger
              onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
            >
              <div className={"relative h-25 w-25"}>
                {freshCount > 0 && (
                  <div
                    className={
                      "absolute right-0 top-0 z-20 flex h-15 w-15 items-center justify-center rounded-full bg-st-red text-12 font-semibold text-st-white"
                    }
                  >
                    {freshCount}
                  </div>
                )}
                <BellIcon
                  className={"absolute z-10"}
                  width={25}
                  height={25}
                />
              </div>
            </PopoverTrigger>

            <PopoverContent className={"h-300 w-350 p-16 pb-40"}>
              <ScrollArea
                className={"h-full w-full rounded-md"}
                scrollBarClassName={"hidden"}
              >
                <div className="px-4 text-center">
                  <h4 className="mb-16 text-20 font-semibold leading-none">
                    알림 목록
                  </h4>
                  {notifications.length > 0 ? (
                    <>
                      {notifications.map(
                        ({ id, content, type, redirectUri, isRead }) => (
                          <div
                            className={"flex justify-center py-10"}
                            key={id}
                          >
                            <div className={"flex items-center px-5"}>
                              {(type === "FRESH_APPLICATION" && (
                                <RocketIcon
                                  width={20}
                                  height={20}
                                  color={"black"}
                                />
                              )) ||
                                (type === "APPLICATION_RESULT" && (
                                  <FileTextIcon
                                    width={20}
                                    height={20}
                                    color={"blue"}
                                  />
                                ))}
                            </div>

                            <div
                              className={cn(
                                "text-md cursor-pointer",
                                isRead ? "text-st-gray-250" : "text-st-black",
                              )}
                              onClick={() =>
                                handleNavigateTo(id.toString(), redirectUri)
                              }
                            >
                              {content}
                            </div>
                            <div className={"flex items-center gap-8"}>
                              <IconButton
                                className={"cursor-pointer"}
                                onClick={() =>
                                  handleReadNotification(id.toString())
                                }
                                size={"2"}
                              >
                                <CheckIcon
                                  width={20}
                                  height={20}
                                  color={"green"}
                                />
                              </IconButton>
                              <IconButton
                                className={"cursor-pointer"}
                                onClick={() =>
                                  handleDeleteNotification(id.toString())
                                }
                                size={"2"}
                              >
                                <Cross2Icon
                                  width={20}
                                  height={20}
                                  color={"red"}
                                />
                              </IconButton>
                            </div>
                            <Separator className="my-2 h-2 bg-st-gray-400" />
                          </div>
                        ),
                      )}
                    </>
                  ) : (
                    <div
                      className={
                        "flex h-full w-full flex-row items-center justify-center py-80 text-st-gray-250"
                      }
                    >
                      알림이 없습니다.
                    </div>
                  )}
                </div>
                {/*{notifications.length <= 0 && (*/}
                {/*  <div*/}
                {/*    className={*/}
                {/*      "h-full w-full items-center justify-center text-st-gray-250"*/}
                {/*    }*/}
                {/*  >*/}
                {/*    알림이 없습니다.*/}
                {/*  </div>*/}
                {/*)}*/}
              </ScrollArea>
              {notifications.length > 0 && (
                <div className={"flex h-35 w-full items-end justify-evenly"}>
                  <Button
                    className={cn("h-30 w-1/3 bg-st-primary text-st-white")}
                    onClick={() => handleReadAllNotification()}
                  >
                    모두 읽음
                  </Button>
                  <Button
                    className={cn("h-30 w-1/3 bg-st-red text-st-white")}
                    onClick={() => handleDeleteAllNotification()}
                  >
                    모두 삭제
                  </Button>
                </div>
              )}
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
