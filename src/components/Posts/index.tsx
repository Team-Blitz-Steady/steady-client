"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/images/logo.svg";
import { Avatar } from "@radix-ui/themes";
import type { Steadies } from "@/services/types";
import noResult from "../../../public/images/no_result.png";
import Icon from "../_common/Icon";
import Tag from "../_common/Tag";

const Posts = ({ info }: { info: Steadies }) => {
  const [differences, setDifferences] = useState<
    { days: number; hours: number }[]
  >([]);

  useEffect(() => {
    const calculateDateDifferences = () => {
      const currentDate = new Date();
      const calculatedDifferences = info?.content.map((serverDate) => {
        const serverDateObject = new Date(serverDate.createdAt);
        const timeDifference =
          currentDate.valueOf() - serverDateObject.valueOf();
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24),
        );
        const hoursDifference = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );

        return { days: daysDifference, hours: hoursDifference };
      });

      setDifferences(calculatedDifferences);
    };

    calculateDateDifferences();
  }, [info]);

  return (
    <div
      className={`h-[1110px] w-full md:h-[1355px] ${
        info?.content.length === 0 && "flex items-center justify-center"
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
              <div className="flex items-center gap-20 md:gap-50">
                {item.status === "RECRUITING" ? (
                  <Tag status="RECRUITING" />
                ) : (
                  <Tag status="CLOSED" />
                )}

                <div className="flex flex-col gap-5">
                  <div className="text-10 font-bold md:text-15">
                    {item.type === "STUDY" ? "📖스터디" : "🖥프로젝트"}
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
                      size={"2"}
                      radius="full"
                      className="cursor-pointer"
                      fallback={""}
                    />
                  ) : (
                    <Image
                      src={Logo}
                      alt="profile"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
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
                      ? `${differences && differences[index]?.hours}시간 전`
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
