"use client";

import { useState } from "react";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import Input from "@/components/_common/Input";
import Line from "@/components/_common/Line";
import CopyRight from "../../public/images/copyright.svg";
import First from "../../public/images/first.svg";
import Second from "../../public/images/second.svg";
import Third from "../../public/images/third.svg";
import Turtle from "../../public/images/turtle.svg";

const Home = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("전체");
  const [tmp, setTmp] = useState("최신");

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
      <div className="flex h-380 w-screen justify-center bg-banner-bg">
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
      <section className="my-50 flex flex-col flex-wrap items-center justify-center overflow-hidden">
        <div className="w-3/4 text-2xl font-bold xl:w-full">🔥 인기 스테디</div>
        <div className="mt-20 flex h-220 flex-wrap items-center justify-center overflow-hidden">
          <div className="relative m-20 h-170 w-300 cursor-pointer rounded-20 shadow-lg transition hover:scale-105">
            <Image
              src={First}
              alt="first-steady"
              width={45}
              height={45}
              className="absolute left-0 top-0"
            />
          </div>
          <div className="relative m-20 h-170 w-300 cursor-pointer rounded-20 shadow-lg transition hover:scale-105">
            <Image
              src={Second}
              alt="second-steady"
              width={45}
              height={45}
              className="absolute left-0 top-0"
            />
          </div>
          <div className="relative m-20 h-170 w-300 cursor-pointer rounded-20 shadow-lg transition hover:scale-105">
            <Image
              src={Third}
              alt="third-steady"
              width={45}
              height={45}
              className="absolute left-0 top-0"
            />
          </div>
          <div className="m-20 h-170 w-300 cursor-pointer rounded-20 shadow-lg transition hover:scale-105"></div>
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
        <Line className="h-5 w-full bg-st-gray-200" />
        <div className="h-1000 w-full">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between px-50 py-20 transition hover:scale-105 hover:bg-st-gray-50"
            >
              <div className="flex items-center gap-50">
                <div className="h-30 w-70 rounded-20 border-3 border-st-primary text-center text-17 font-bold">
                  모집
                </div>
                <div>
                  <div>📖스터디</div>
                  <div className="text-25 font-bold">{item.title}</div>
                  <div className="flex gap-20">
                    {item.categories.map((category, catIndex) => (
                      <div key={catIndex}>#{category}</div>
                    ))}
                  </div>
                  <div className="flex gap-20">
                    <div className="flex items-center justify-center">
                      <Icon
                        name="person"
                        size={15}
                        color=""
                      />
                      {`${item.currentParticipants}/${item.maxParticipants}`}
                    </div>
                    <div>마감일 | {item.deadline}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-30">
                <div>{item.author}</div>
                <div className="flex items-center justify-center gap-10">
                  <div className="flex items-center justify-center gap-5">
                    <Icon
                      name="eye"
                      size={15}
                      color="text-st-gray-100"
                    />
                    {item.views}
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <Icon
                      name="chat"
                      size={15}
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
        <Line className="h-5 w-full bg-st-gray-200" />
      </section>
      <section className="flex h-100 w-full items-center justify-center">
        <Button
          className={`${buttonSize.pg} flex items-center justify-center hover:bg-st-primary hover:text-st-white`}
        >
          <Icon
            name="chevron-left"
            size={20}
            color="black"
          />
        </Button>
        <Pagination
          totalPosts={100}
          limit={10}
          page={page}
          setPage={setPage}
        />
        <Button
          className={`${buttonSize.pg} flex items-center justify-center hover:bg-st-primary hover:text-st-white`}
        >
          <Icon
            name="chevron-right"
            size={20}
            color="black"
          />
        </Button>
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
