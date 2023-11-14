"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import * as ChannelIO from "@channel.io/channel-web-sdk-loader";
import { useQuery } from "@tanstack/react-query";
import {
  steadyStatusFilter,
  steadyTypeFilter,
} from "@/services/steady/filterSteadies";
import getSteadies from "@/services/steady/getSteadies";
import { searchSteadies } from "@/services/steady/searchSteadies";
import type { Steadies } from "@/services/types";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import Input from "@/components/_common/Input";
import { MultiSelector, SingleSelector } from "@/components/_common/Selector";
import StickyButton from "@/components/_common/StickyButton";
import {
  steadyExpectedTechStacks,
  steadyRecruitmentFields,
  steadyRunningMethods,
} from "@/constants/create-steady";
import Dolphin from "../../public/images/dolphin.png";
import First from "../../public/images/first.svg";
import Second from "../../public/images/second.svg";
import Third from "../../public/images/third.svg";
import Turtle from "../../public/images/turtle.png";
import Walrus from "../../public/images/walrus.png";

const Home = () => {
  const [page, setPage] = useState(0);
  const [like, setLike] = useState(false);
  const [recruit, setRecruit] = useState(false);
  const [post, setPost] = useState<Steadies>();
  const [type, setType] = useState("all");
  const [filter, setFilter] = useState("최신");
  const [activeIndex, setActiveIndex] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const { data } = useQuery({
    queryKey: ["steadies"],
    queryFn: () => getSteadies(page.toString()),
  });

  const [totalPost, setTotalPost] = useState(data?.totalElements);

  const handleGetSteadies = async (page: string) => {
    const data = await getSteadies(page.toString());
    setTotalPost(data.totalElements);
    setPost(data);
  };

  const handleRecruit = async (page: string) => {
    const data = await steadyStatusFilter(page);
    setPost(data);
  };

  const handleSteadyType = async (type: string, page: string) => {
    const data = await steadyTypeFilter(type, page);
    setPost(data);
  };

  const handleSteadySearch = async (keyword: string) => {
    const data = await searchSteadies(keyword);
    setPage(0);
    setTotalPost(data.totalElements);
    setPost(data);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data]);

  useEffect(() => {
    ChannelIO.loadScript();
    ChannelIO.boot({
      pluginKey: `${process.env.NEXT_PUBLIC_PLUGIN_KEY}`,
    });
    ChannelIO.hideChannelButton();
  }, []);

  useEffect(() => {
    const delay = 300;

    const debounceTimer = setTimeout(() => {
      setDebouncedValue(keyword);
    }, delay);

    return () => clearTimeout(debounceTimer);
  }, [keyword]);

  useEffect(() => {
    if (debouncedValue) {
      handleSteadySearch(debouncedValue);
    } else {
      handleGetSteadies(page.toString());
    }
  }, [debouncedValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const bannerDefaultStyle =
    "duration-1500 absolute left-0 top-0 flex h-380 w-full justify-center transition-opacity";
  const bannerValidStyle = "opacity-100 transition-opacity ease-in";
  const bannerInvalidStyle = "opacity-0 transition-opacity ease-out";

  const popularSteadyData = [
    {
      title: "Next JS 스터디 모집합니다~!",
      deadline: "마감일 | 2023.11.13",
      views: 1301,
      category: "📖 스터디",
      d_day: "D-15",
      rank: 1,
      image: First,
    },
    {
      title: "JavaScript 스터디 모집합니다~!",
      deadline: "마감일 | 2023.11.11",
      views: 575,
      category: "📖 스터디",
      d_day: "D-7",
      rank: 2,
      image: Second,
    },
    {
      title: "Java 프로젝트 모집합니다~!",
      deadline: "마감일 | 2023.12.02",
      views: 443,
      category: "🖥 프로젝트",
      d_day: "D-20",
      rank: 3,
      image: Third,
    },
    {
      title: "Next JS 스터디 모집합니다~!",
      deadline: "마감일 | 2023.12.25",
      views: 189,
      category: "📖 스터디",
      d_day: "D-11",
      rank: 4,
      image: "",
    },
  ];

  return (
    <main className="relative flex flex-col items-center">
      <div className="relative flex h-380 w-screen transition">
        <div
          className={`${
            activeIndex === 1 ? bannerValidStyle : bannerInvalidStyle
          } ${bannerDefaultStyle} bg-banner-bg`}
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
            activeIndex === 2 ? bannerValidStyle : bannerInvalidStyle
          } ${bannerDefaultStyle} bg-banner-bg2`}
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
            activeIndex === 0 ? bannerValidStyle : bannerInvalidStyle
          } ${bannerDefaultStyle} bg-banner-bg3`}
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
          {popularSteadyData.map((item) => (
            <div
              key={item.rank}
              className="relative m-20 flex h-170 w-300 cursor-pointer flex-col items-center justify-center gap-20 rounded-20 shadow-lg transition hover:scale-105"
            >
              {item.rank <= 3 ? (
                <Image
                  src={item.image}
                  alt="first-steady"
                  width={45}
                  height={45}
                  className="absolute left-0 top-0"
                />
              ) : (
                ""
              )}
              <div className="flex w-250 items-center justify-end">
                <div className="flex h-28 w-60 items-center justify-center rounded-20 border border-st-red shadow-md">
                  <div className="h-22 w-54 rounded-20 bg-st-red text-center font-bold text-st-white">
                    {item.d_day}
                  </div>
                </div>
              </div>
              <div className="text-18 font-bold">
                <div className="text-12 font-bold">{item.category}</div>
                {item.title}
              </div>
              <div className="flex justify-between gap-40">
                <div className="font-bold text-st-gray-100">
                  {item.deadline}
                </div>
                <div className="flex items-center justify-center gap-5 font-bold text-st-gray-100">
                  <Icon
                    name="eye"
                    size={20}
                    color="text-st-gray-100"
                  />
                  {item.views}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex w-3/4 flex-col items-center xl:w-1300">
        <div className="flex w-full justify-between p-20">
          <div className="flex gap-20">
            <div
              className={`${
                type === "all" ? "" : "text-st-gray-100"
              } cursor-pointer text-2xl font-bold`}
              onClick={() => {
                setType("all");
                handleGetSteadies(page.toString());
              }}
            >
              전체
            </div>
            <div
              className={`${
                type === "STUDY" ? "" : "text-st-gray-100"
              } cursor-pointer text-2xl font-bold`}
              onClick={() => {
                setType("STUDY");
                handleSteadyType("STUDY", page.toString());
              }}
            >
              스터디
            </div>
            <div
              className={`${
                type === "PROJECT" ? "" : "text-st-gray-100"
              } cursor-pointer text-2xl font-bold`}
              onClick={() => {
                setType("PROJECT");
                handleSteadyType("PROJECT", page.toString());
              }}
            >
              프로젝트
            </div>
          </div>
          <Input
            inputName="search-input"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="m-10 flex w-full justify-between">
          <div className="flex items-center justify-center gap-5">
            <MultiSelector
              initialLabel={"기술 스택"}
              items={steadyExpectedTechStacks}
              className="w-220"
            />
            <SingleSelector
              initialLabel={"포지션"}
              items={steadyRecruitmentFields}
              className="mb-8 h-43 w-150"
            />
            <SingleSelector
              initialLabel={"진행 방식"}
              items={steadyRunningMethods}
              className="mb-8 h-43 w-150"
            />
            <div
              className={`${
                like ? "border-5 border-st-yellow" : "border border-st-gray-100"
              } transition-border mx-10 mb-8 flex h-43 w-150 items-center justify-center rounded-5 duration-100`}
            >
              <button
                className="h-full w-full font-bold"
                onClick={() => setLike(!like)}
              >
                💛 내 좋아요
              </button>
            </div>
            <div
              className={`${
                recruit
                  ? "border-5 border-st-primary"
                  : "border border-st-gray-100"
              } transition-border mx-10 mb-8 flex h-43 w-100 items-center justify-center rounded-5 duration-100`}
            >
              <button
                className="h-full w-full font-bold"
                onClick={() => {
                  if (recruit) {
                    setRecruit(!recruit);
                    setPost(data);
                  } else {
                    handleRecruit(page.toString());
                    setRecruit(!recruit);
                  }
                }}
              >
                모집중
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-20">
            <div className="hidden items-center justify-center gap-20 xl:flex">
              <div
                className={`${
                  filter === "마감" ? "" : "text-st-gray-100"
                } flex cursor-pointer items-center justify-center gap-5 font-bold`}
                onClick={() => setFilter("마감")}
              >
                <div
                  className={`${
                    filter === "마감" ? "bg-st-primary" : "bg-st-gray-100"
                  } h-10 w-10 rounded-full `}
                ></div>
                마감 임박순
              </div>
              <div
                className={`${
                  filter === "최신" ? "" : "text-st-gray-100"
                } flex cursor-pointer items-center justify-center gap-5 font-bold`}
                onClick={() => setFilter("최신")}
              >
                <div
                  className={`${
                    filter === "최신" ? "bg-st-primary" : "bg-st-gray-100"
                  } h-10 w-10 rounded-full `}
                ></div>
                최신 글순
              </div>
            </div>
            <Link href={"/steady/create"}>
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
            </Link>
          </div>
        </div>
        <div className="h-5 w-full bg-st-gray-400" />
        <Posts info={post as Steadies} />
        <div className="h-5 w-full bg-st-gray-400" />
      </section>
      <section className="flex h-100 w-full items-center justify-center">
        <Pagination
          totalPost={totalPost as number}
          page={page}
          setPage={setPage}
          setPost={setPost as Dispatch<SetStateAction<Steadies>>}
        />
      </section>
      <div className="fixed bottom-40 right-10 z-10 flex gap-10">
        <div
          className="flex h-65 w-65 cursor-pointer items-center justify-center rounded-full bg-st-primary"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="flex h-55 w-55 items-center justify-center rounded-full bg-st-white">
            <div className="text-17 font-bold">TOP</div>
          </div>
        </div>
        <StickyButton onClick={() => ChannelIO.showMessenger()} />
      </div>
    </main>
  );
};

export default Home;
