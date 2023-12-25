"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/images/logo.svg";
import { Avatar, Badge, Tooltip } from "@radix-ui/themes";
import type { Steadies } from "@/services/types";
import noResult from "../../../public/images/no_result.png";
import Icon from "../_common/Icon";
import Tag from "../_common/Tag";

const Posts = ({ info }: { info: Steadies }) => {
  const [differences, setDifferences] = useState<
    { days: number; hours: number; minutes: number }[]
  >([]);

  useEffect(() => {
    const calculateDateDifferences = () => {
      const currentDate = new Date();
      const calculatedDifferences = info?.content.map((serverDate) => {
        const serverDateObject = new Date(serverDate.createdAt);
        const timeDifference =
          currentDate.valueOf() -
          (serverDateObject.valueOf() + 1000 * 60 * 60 * 9);
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24),
        );
        const hoursDifference = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutesDifference = Math.floor(
          ((timeDifference % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) /
            (1000 * 60),
        );

        return {
          days: daysDifference,
          hours: hoursDifference,
          minutes: minutesDifference,
        };
      });

      setDifferences(calculatedDifferences);
    };

    calculateDateDifferences();
  }, [info]);

  return (
    <div
      className={`w-full ${
        info?.content.length === 0 &&
        "flex h-[1120px] items-center justify-center"
      }`}
    >
      {info?.content.length !== 0 ? (
        info?.content.map((item, index) => (
          <Link
            href={`/steady/detail/${item.id}`}
            key={index}
          >
            <div
              className={`${
                item.status !== "RECRUITING" && "opacity-50"
              } flex w-full items-center justify-between px-20 py-20 transition hover:scale-105 hover:bg-st-gray-50 md:px-50`}
            >
              <div className="flex w-2/3 items-center gap-20 md:gap-50">
                {item.status === "RECRUITING" ? (
                  <Tag status="RECRUITING" />
                ) : item.status === "CLOSED" ? (
                  <Tag status="CLOSED" />
                ) : (
                  <Tag status="FINISHED" />
                )}

                <div className="flex w-2/3 flex-col gap-5">
                  <div className="flex gap-10">
                    <div className="text-10 font-bold md:text-15">
                      {item.type === "STUDY" ? (
                        <Badge
                          color={"grass"}
                          size={"1"}
                          radius={"medium"}
                        >
                          스터디
                        </Badge>
                      ) : (
                        <Badge
                          color={"orange"}
                          size={"1"}
                          radius={"medium"}
                        >
                          프로젝트
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-5 overflow-hidden">
                      {item.stacks.map((stack) => (
                        <Tooltip
                          key={stack.id}
                          content={stack.name}
                        >
                          <Image
                            src={stack.imageUrl}
                            alt="기술 스택"
                            width={20}
                            height={20}
                            className="rounded-full border-1"
                          />
                        </Tooltip>
                      ))}
                    </div>
                  </div>

                  <div className="text-17 font-bold md:text-25">
                    {item.title}
                  </div>
                  <div className="flex gap-20">
                    <div className="flex items-center justify-center gap-10 text-10 font-bold md:text-15">
                      <Icon
                        name="person"
                        size={15}
                        color=""
                      />
                      {`${item.numberOfParticipants}/${item.participantLimit}`}
                    </div>
                    <div className="text-10 font-bold text-st-gray-100 md:text-15">
                      마감일 | {item.deadline}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-110 flex-col gap-30 md:w-170">
                <div className="flex items-center gap-10 text-10 font-bold md:text-17">
                  {item.profileImage !== "new_profile_image.jpg" ? (
                    <Avatar
                      src={item.profileImage}
                      alt="profile"
                      radius="full"
                      className="aspect-square h-20 w-20 cursor-pointer md:flex md:h-25 md:w-25"
                      fallback={""}
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full md:h-25 md:w-25">
                      <Image
                        src={Logo}
                        layout="full"
                        alt="profile"
                      />
                    </div>
                  )}
                  |{" "}
                  {item.nickname.length > 6
                    ? `${item.nickname.slice(0, 6)}...`
                    : item.nickname}
                </div>
                <div className="flex items-center justify-start gap-10">
                  <div className="hidden md:flex md:gap-10">
                    <div className="flex items-center justify-center gap-5 font-bold text-st-gray-100">
                      <Icon
                        name="eye"
                        size={22}
                        color="text-st-gray-100"
                      />
                      {item.viewCount}
                    </div>
                    <div className="flex items-center justify-center gap-5 font-bold text-st-gray-100">
                      <Icon
                        name="heart"
                        size={20}
                        color="text-st-gray-100"
                      />
                      {item.likeCount}
                    </div>
                  </div>
                  <div className="flex gap-10 md:hidden">
                    <div className="flex items-center justify-center gap-5 text-10 font-bold text-st-gray-100">
                      <Icon
                        name="eye"
                        size={15}
                        color="text-st-gray-100"
                      />
                      {item.viewCount}
                    </div>
                    <div className="flex items-center justify-center gap-5 text-10 font-bold text-st-gray-100">
                      <Icon
                        name="heart"
                        size={15}
                        color="text-st-gray-100"
                      />
                      {item.likeCount}
                    </div>
                  </div>
                  <div className="text-10 md:text-15">
                    {differences && differences[index]?.days === 0
                      ? differences && differences[index]?.hours === 0
                        ? `${differences && differences[index]?.minutes}분 전`
                        : `${differences && differences[index]?.hours}시간 전`
                      : `${differences && differences[index]?.days}일 전`}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <Image
          src={noResult}
          alt="no_result"
          width={350}
          height={230}
        />
      )}
    </div>
  );
};

export default Posts;
