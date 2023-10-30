"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import { Avatar } from "@radix-ui/themes";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import Input from "@/components/_common/Input";
import CopyRight from "../../public/images/copyright.svg";
import Dolphin from "../../public/images/dolphin.png";
import First from "../../public/images/first.svg";
import Second from "../../public/images/second.svg";
import Third from "../../public/images/third.svg";
import Turtle from "../../public/images/turtle.png";
import Walrus from "../../public/images/walrus.png";

const Home = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("전체");
  const [tmp, setTmp] = useState("최신");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
      console.log(activeIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const data = [
    {
      title:
        "Next JS 스터디 모집합니다~! Next JS를 처음 접하셨다면 더욱 환영입니다!",
      categories: ["프론트엔드", "넥스트"],
      currentParticipants: 5,
      maxParticipants: 6,
      deadline: "2023.11.13",
      author: "zz지존스테디장zz",
      views: 123,
      comments: 10,
      postedAgo: "1일 전",
    },
    {
      title:
        "Next JS 스터디 모집합니다~! Next JS를 처음 접하셨다면 더욱 환영입니다!",
      categories: ["프론트엔드", "넥스트"],
      currentParticipants: 5,
      maxParticipants: 6,
      deadline: "2023.11.13",
      author: "zz지존스테디장zz",
      views: 123,
      comments: 10,
      postedAgo: "1일 전",
    },
    {
      title:
        "Next JS 스터디 모집합니다~! Next JS를 처음 접하셨다면 더욱 환영입니다!",
      categories: ["프론트엔드", "넥스트"],
      currentParticipants: 5,
      maxParticipants: 6,
      deadline: "2023.11.13",
      author: "zz지존스테디장zz",
      views: 123,
      comments: 10,
      postedAgo: "1일 전",
    },
    {
      title:
        "Next JS 스터디 모집합니다~! Next JS를 처음 접하셨다면 더욱 환영입니다!",
      categories: ["프론트엔드", "넥스트"],
      currentParticipants: 5,
      maxParticipants: 6,
      deadline: "2023.11.13",
      author: "zz지존스테디장zz",
      views: 123,
      comments: 10,
      postedAgo: "1일 전",
    },
    {
      title:
        "Next JS 스터디 모집합니다~! Next JS를 처음 접하셨다면 더욱 환영입니다!",
      categories: ["프론트엔드", "넥스트"],
      currentParticipants: 5,
      maxParticipants: 6,
      deadline: "2023.11.13",
      author: "zz지존스테디장zz",
      views: 123,
      comments: 10,
      postedAgo: "1일 전",
    },
    {
      title:
        "Next JS 스터디 모집합니다~! Next JS를 처음 접하셨다면 더욱 환영입니다!",
      categories: ["프론트엔드", "넥스트"],
      currentParticipants: 5,
      maxParticipants: 6,
      deadline: "2023.11.13",
      author: "zz지존스테디장zz",
      views: 123,
      comments: 10,
      postedAgo: "1일 전",
    },
  ];

  return (
    <main className="flex flex-col items-center">
      <div className="relative flex h-380 w-screen transition">
        <div
          className={`${
            activeIndex === 1
              ? "opacity-100 transition-opacity duration-2000 ease-in"
              : "opacity-0 transition-opacity duration-2000 ease-out"
          } linear duration-[2000ms] absolute left-0 top-0 flex h-380 w-full justify-center bg-banner-bg transition-opacity`}
        >
          <div className="flex w-3/5 items-center justify-around">
            <div className="flex flex-col">
              <div className="font-bold text-st-white md:text-3xl lg:text-4xl xl:text-5xl">
                스테디로
              </div>
              <div className="mt-10 font-bold text-st-white md:text-3xl lg:text-4xl xl:text-5xl">
                동료를 찾아보세요!
              </div>
            </div>
            <div className="h-150 w-150 md:h-150 md:w-150 lg:h-200 lg:w-200 xl:h-250 xl:w-250">
              <Image
                src={Turtle}
                alt="Turtle"
              />
            </div>
          </div>
        </div>
        <div
          className={`${
            activeIndex === 2
              ? "opacity-100 transition-opacity duration-2000 ease-in"
              : "opacity-0 transition-opacity duration-2000 ease-out"
          } duration-[2000ms] absolute left-0 top-0 flex h-380 w-full justify-center bg-banner-bg2 transition-opacity`}
        >
          <div className="flex w-3/5 items-center justify-around">
            <div className="flex flex-col">
              <div className="font-bold text-st-white md:text-3xl lg:text-4xl xl:text-5xl">
                스테디는
              </div>
              <div className="mt-10 font-bold text-st-white md:text-3xl lg:text-4xl xl:text-5xl">
                사랑입니다~!
              </div>
            </div>
            <div className="h-150 w-150 md:h-150 md:w-150 lg:h-200 lg:w-200 xl:h-250 xl:w-250">
              <Image
                src={Dolphin}
                alt="Turtle"
              />
            </div>
          </div>
        </div>
        <div
          className={`${
            activeIndex === 0
              ? "opacity-100 transition-opacity duration-2000 ease-in"
              : "opacity-0 transition-opacity duration-2000 ease-out"
          } linear duration-[2000ms] absolute left-0 top-0 flex h-380 w-full justify-center bg-banner-bg3 transition-opacity`}
        >
          <div className="flex w-3/5 items-center justify-around">
            <div className="flex flex-col">
              <div className="font-bold text-st-white md:text-3xl lg:text-4xl xl:text-5xl">
                스테디에
              </div>
              <div className="mt-10 font-bold text-st-white md:text-3xl lg:text-4xl xl:text-5xl">
                도전해 보세요!
              </div>
            </div>
            <div className="h-150 w-150 md:h-150 md:w-150 lg:h-200 lg:w-200 xl:h-250 xl:w-250">
              <Image
                src={Walrus}
                alt="Turtle"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="m-10 flex items-center justify-center gap-20">
        <div
          className={`h-10 w-10 rounded-full ${
            activeIndex === 0 ? "bg-st-gray-400" : "bg-st-gray-100"
          } cursor-pointer`}
          onClick={() => setActiveIndex(0)}
        ></div>
        <div
          className={`h-10 w-10 rounded-full ${
            activeIndex === 1 ? "bg-st-gray-400" : "bg-st-gray-100"
          } cursor-pointer`}
          onClick={() => setActiveIndex(1)}
        ></div>
        <div
          className={`h-10 w-10 rounded-full ${
            activeIndex === 2 ? "bg-st-gray-400" : "bg-st-gray-100"
          } cursor-pointer`}
          onClick={() => setActiveIndex(2)}
        ></div>
      </div>
      <section className="my-50 flex flex-col flex-wrap items-center justify-center overflow-hidden">
        <div className="w-3/4 text-2xl font-bold xl:w-full">🔥 인기 스테디</div>
        <div className="mt-20 flex h-220 flex-wrap items-center justify-center overflow-hidden">
          <div className="relative m-20 flex h-170 w-300 cursor-pointer flex-col items-center justify-center gap-20 rounded-20 shadow-lg transition hover:scale-105">
            <Image
              src={First}
              alt="first-steady"
              width={45}
              height={45}
              className="absolute left-0 top-0"
            />
            <div className="flex w-250 items-center justify-end">
              <div className="flex h-28 w-60 items-center justify-center rounded-20 border border-st-red shadow-md">
                <div className="h-22 w-54 rounded-20 bg-st-red text-center font-bold text-st-white">
                  D-15
                </div>
              </div>
            </div>
            <div className="text-18 font-bold">
              <div className="text-12 font-bold">📖 스터디</div>
              Next JS 스터디 모집합니다~!
            </div>
            <div className="flex justify-between gap-40">
              <div className="font-bold text-st-gray-100">
                마감일 | 2023.11.13
              </div>
              <div className="flex items-center justify-center gap-5 font-bold text-st-gray-100">
                <Icon
                  name="eye"
                  size={20}
                  color="text-st-gray-100"
                />
                1301
              </div>
            </div>
          </div>
          <div className="relative m-20 flex h-170 w-300 cursor-pointer flex-col items-center justify-center gap-20 rounded-20 shadow-lg transition hover:scale-105">
            <Image
              src={Second}
              alt="second-steady"
              width={45}
              height={45}
              className="absolute left-0 top-0"
            />
            <div className="flex w-250 items-center justify-end">
              <div className="flex h-28 w-60 items-center justify-center rounded-20 border border-st-red shadow-md">
                <div className="h-22 w-54 rounded-20 bg-st-red text-center font-bold text-st-white">
                  D-7
                </div>
              </div>
            </div>
            <div className="text-18 font-bold">
              <div className="text-12 font-bold">📖 스터디</div>
              JavaScript 스터디 모집합니다~!
            </div>
            <div className="flex justify-between gap-40">
              <div className="font-bold text-st-gray-100">
                마감일 | 2023.11.11
              </div>
              <div className="flex items-center justify-center gap-5 font-bold text-st-gray-100">
                <Icon
                  name="eye"
                  size={20}
                  color="text-st-gray-100"
                />
                575
              </div>
            </div>
          </div>
          <div className="relative m-20 flex h-170 w-300 cursor-pointer flex-col items-center justify-center gap-20 rounded-20 shadow-lg transition hover:scale-105">
            <Image
              src={Third}
              alt="third-steady"
              width={45}
              height={45}
              className="absolute left-0 top-0"
            />
            <div className="flex w-250 items-center justify-end">
              <div className="flex h-28 w-60 items-center justify-center rounded-20 border border-st-red shadow-md">
                <div className="h-22 w-54 rounded-20 bg-st-red text-center font-bold text-st-white">
                  D-20
                </div>
              </div>
            </div>
            <div className="text-18 font-bold">
              <div className="text-12 font-bold">🖥 프로젝트</div>
              Java 스터디 모집합니다~!
            </div>
            <div className="flex justify-between gap-40">
              <div className="font-bold text-st-gray-100">
                마감일 | 2023.12.02
              </div>
              <div className="flex items-center justify-center gap-5 font-bold text-st-gray-100">
                <Icon
                  name="eye"
                  size={20}
                  color="text-st-gray-100"
                />
                443
              </div>
            </div>
          </div>
          <div className="relative m-20 flex h-170 w-300 cursor-pointer flex-col items-center justify-center gap-20 rounded-20 shadow-lg transition hover:scale-105">
            <div className="flex w-250 items-center justify-end">
              <div className="flex h-28 w-60 items-center justify-center rounded-20 border border-st-red shadow-md">
                <div className="h-22 w-54 rounded-20 bg-st-red text-center font-bold text-st-white">
                  D-11
                </div>
              </div>
            </div>
            <div className="text-18 font-bold">
              <div className="text-12 font-bold">📖 스터디</div>
              Next JS 스터디 모집합니다~!
            </div>
            <div className="flex justify-between gap-40">
              <div className="font-bold text-st-gray-100">
                마감일 | 2023.12.25
              </div>
              <div className="flex items-center justify-center gap-5 font-bold text-st-gray-100">
                <Icon
                  name="eye"
                  size={20}
                  color="text-st-gray-100"
                />
                189
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex w-3/4 flex-col items-center xl:w-1300">
        <div className="flex w-full justify-between p-20">
          <div className="flex gap-20">
            <div
              className={`${
                filter === "전체" ? "" : "text-st-gray-100"
              } cursor-pointer text-2xl font-bold`}
              onClick={() => setFilter("전체")}
            >
              전체
            </div>
            <div
              className={`${
                filter === "스터디" ? "" : "text-st-gray-100"
              } cursor-pointer text-2xl font-bold`}
              onClick={() => setFilter("스터디")}
            >
              스터디
            </div>
            <div
              className={`${
                filter === "프로젝트" ? "" : "text-st-gray-100"
              } cursor-pointer text-2xl font-bold`}
              onClick={() => setFilter("프로젝트")}
            >
              프로젝트
            </div>
          </div>
          <Input inputName="search-input" />
        </div>
        <div className="m-10 flex w-full justify-between">
          <div className="flex items-center justify-center gap-5">
            <div className="mx-10 flex h-40 w-150 items-center justify-center rounded-10 border border-st-gray-100 pr-5">
              <button className="h-full w-full pl-20 font-bold">
                기술 스택
              </button>
              <Icon
                name="chevron-down"
                size={20}
                color=""
              />
            </div>
            <div className="mx-10 flex h-40 w-150 items-center justify-center rounded-10 border border-st-gray-100 pr-5">
              <button className="h-full w-full pl-20 font-bold">포지션</button>
              <Icon
                name="chevron-down"
                size={20}
                color=""
              />
            </div>
            <div className="mx-10 flex h-40 w-150 items-center justify-center rounded-10 border border-st-gray-100 pr-5">
              <button className="h-full w-full pl-20 font-bold">
                진행 방식
              </button>
              <Icon
                name="chevron-down"
                size={20}
                color=""
              />
            </div>
            <div className="mx-10 flex h-40 w-150 items-center justify-center rounded-10 border border-st-gray-100">
              <button className="h-full w-full font-bold">💛 내 좋아요</button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-20">
            <div className="hidden items-center justify-center gap-20 xl:flex">
              <div
                className={`${
                  tmp === "마감" ? "" : "text-st-gray-100"
                } flex cursor-pointer items-center justify-center gap-5 font-bold`}
                onClick={() => setTmp("마감")}
              >
                <div
                  className={`${
                    tmp === "마감" ? "bg-st-primary" : "bg-st-gray-100"
                  } h-10 w-10 rounded-full `}
                ></div>
                마감 임박순
              </div>
              <div
                className={`${
                  tmp === "최신" ? "" : "text-st-gray-100"
                } flex cursor-pointer items-center justify-center gap-5 font-bold`}
                onClick={() => setTmp("최신")}
              >
                <div
                  className={`${
                    tmp === "최신" ? "bg-st-primary" : "bg-st-gray-100"
                  } h-10 w-10 rounded-full `}
                ></div>
                최신 글순
              </div>
            </div>
            <Button
              className={`${buttonSize.xl} flex items-center justify-center gap-10 bg-st-primary text-st-white`}
            >
              <Icon
                name="pencil"
                size={25}
                color="text-st-white"
              />
              스테디 등록
            </Button>
          </div>
        </div>
        <div className="h-5 w-full bg-st-gray-200" />
        <div className="w-full">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between px-50 py-20 transition hover:scale-105 hover:bg-st-gray-50"
            >
              <div className="flex items-center gap-50">
                <div className="h-30 w-70 rounded-20 border-3 border-st-primary text-center text-17 font-bold">
                  모집
                </div>
                <div className="flex flex-col gap-5">
                  <div className="font-bold">📖스터디</div>
                  <div className="text-25 font-bold">{item.title}</div>
                  <div className="flex gap-20 text-st-gray-200">
                    {item.categories.map((category, catIndex) => (
                      <div key={catIndex}>#{category}</div>
                    ))}
                  </div>
                  <div className="flex gap-20">
                    <div className="flex items-center justify-center gap-10 font-bold">
                      <Icon
                        name="person"
                        size={15}
                        color=""
                      />
                      {`${item.currentParticipants}/${item.maxParticipants}`}
                    </div>
                    <div className="font-bold text-st-gray-100">
                      마감일 | {item.deadline}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-30">
                <div>
                  <Avatar
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-nNEUqRaqDl6w3h_YQwa0T39tLQ0xWwOMg&usqp=CAU"
                    }
                    alt="profile"
                    size={"3"}
                    radius="full"
                    className="cursor-pointer"
                    fallback={""}
                  />
                  | {item.author}
                </div>
                <div className="flex items-center justify-center gap-10">
                  <div className="flex items-center justify-center gap-5">
                    <Icon
                      name="eye"
                      size={20}
                      color="text-st-gray-100"
                    />
                    {item.views}
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <Icon
                      name="chat"
                      size={20}
                      color="text-st-gray-100"
                    />
                    {item.comments}
                  </div>
                  <div>{item.postedAgo}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-5 w-full bg-st-gray-200" />
      </section>
      <section className="flex h-100 w-full items-center justify-center">
        <button className="flex h-35 w-35 items-center justify-center rounded-15 text-center font-bold shadow-md hover:bg-st-primary hover:text-st-white">
          <Icon
            name="chevron-left"
            size={20}
            color="black"
          />
        </button>
        <Pagination
          totalPosts={100}
          limit={10}
          page={page}
          setPage={setPage}
        />
        <button className="flex h-35 w-35 items-center justify-center rounded-15 text-center font-bold shadow-md hover:bg-st-primary hover:text-st-white">
          <Icon
            name="chevron-right"
            size={20}
            color="black"
          />
        </button>
      </section>
      <footer className="flex h-250 w-screen items-center justify-evenly bg-st-gray-50">
        <Image
          src={CopyRight}
          alt="CopyRight"
          width={300}
          height={200}
        />
        <div className="flex items-center justify-center gap-50">
          <div className="font-bold">이용약관</div>
          <div className="font-bold">개인정보처리방침</div>
          <div className="font-bold">서비스 소개</div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
