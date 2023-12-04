"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import Sheet from "react-modal-sheet";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import Dolphin from "@/images/dolphin.png";
import First from "@/images/first.svg";
import Second from "@/images/second.svg";
import Third from "@/images/third.svg";
import Turtle from "@/images/turtle.png";
import Walrus from "@/images/walrus.png";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/isAuth";
import useIsSearchBarFocusStore from "@/stores/isSearchBarFocus";
import usePageStore from "@/stores/page";
import useWelcomeModalOpenStore from "@/stores/welcomeModalOpen";
import * as ChannelIO from "@channel.io/channel-web-sdk-loader";
import { useSuspenseQuery } from "@tanstack/react-query";
import steadyFilter from "@/services/steady/filterSteadies";
import getPopularSteadies from "@/services/steady/getPopularSteadies";
import getPositions from "@/services/steady/getPositions";
import getStacks from "@/services/steady/getStacks";
import getSteadies from "@/services/steady/getSteadies";
import searchSteadies from "@/services/steady/searchSteadies";
import type {
  PositionResponse,
  StackResponse,
  Steadies,
} from "@/services/types";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import AlertModal from "@/components/_common/Modal/AlertModal";
import LoginModal from "@/components/_common/Modal/LoginModal";
import WelcomeModal from "@/components/_common/Modal/WelcomeModal";
import { MultiSelector, SingleSelector } from "@/components/_common/Selector";
import StickyButton from "@/components/_common/StickyButton";
import {
  PopularSteadiesKey,
  PositionsKey,
  StacksKey,
  SteadiesKey,
} from "@/constants/queryKeys";
import { steadyRunningMethods } from "@/constants/selectorItems";

const Home = () => {
  const { page, setPage } = usePageStore();
  const [like, setLike] = useState(false);
  const [recruit, setRecruit] = useState(true);
  const [post, setPost] = useState<Steadies>();
  const [type, setType] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [deadline, setDeadline] = useState(false);
  const [stack, setStack] = useState("");
  const [position, setPosition] = useState("");
  const [mode, setMode] = useState("0");
  const { isAuth } = useAuthStore();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const rankImageArray = [
    {
      image: First,
    },
    {
      image: Second,
    },
    {
      image: Third,
    },
  ];
  const { isFocus, setIsFocus } = useIsSearchBarFocusStore();
  const { isOpen } = useWelcomeModalOpenStore();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && isFocus) {
      inputRef.current?.focus();
      inputRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isFocus, isOpen]);

  useEffect(() => {
    return () => {
      setIsFocus(false);
    };
  }, [setIsFocus]);

  const { data: popularSteadies } = useSuspenseQuery<Steadies>({
    queryKey: PopularSteadiesKey,
    queryFn: () => getPopularSteadies(),
  });

  const { data } = useSuspenseQuery<Steadies>({
    queryKey: SteadiesKey,
    queryFn: () =>
      getSteadies(
        stack,
        position,
        mode,
        keyword,
        deadline,
        recruit,
        type,
        page.toString(),
        like,
      ),
  });

  const { data: stacks, error: stacksError } = useSuspenseQuery<StackResponse>({
    queryKey: StacksKey,
    queryFn: () => getStacks(),
  });

  if (stacksError) {
    console.error(stacksError);
  }

  const { data: positions, error: positionsError } =
    useSuspenseQuery<PositionResponse>({
      queryKey: PositionsKey,
      queryFn: () => getPositions(),
    });

  if (positionsError) {
    console.log(positionsError);
  }

  const [totalPost, setTotalPost] = useState(data?.totalElements);

  const handleGetSteadies = async (
    stack: string,
    position: string,
    mode: string,
    keyword: string,
    deadline: boolean,
    recruit: boolean,
    type: string,
    page: string,
    like: boolean,
  ) => {
    const data = await getSteadies(
      stack,
      position,
      mode,
      keyword,
      deadline,
      recruit,
      type,
      page.toString(),
      like,
    );
    setTotalPost(data.totalElements);
    setPost(data);
  };

  const handleSteadySearch = async (keyword: string) => {
    const data = await searchSteadies(keyword);
    setTotalPost(data.totalElements);
    setPost(data);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleFilter = async (
    type: string,
    keyword: string,
    stack: string,
    position: string,
    mode: string,
    status: boolean,
    deadline: boolean,
    like: boolean,
  ) => {
    const data = await steadyFilter(
      type,
      keyword,
      stack,
      position,
      mode,
      status,
      deadline,
      like,
    );
    setTotalPost(data.totalElements);
    setPost(data);
  };

  const calcDateDifference = (deadline: string) => {
    const currDate = new Date();
    const deadlineDate = new Date(deadline);
    return Math.floor(
      (deadlineDate.valueOf() - currDate.valueOf()) / (1000 * 60 * 60 * 24),
    ) < 0
      ? 0
      : Math.floor(
          (deadlineDate.valueOf() - currDate.valueOf()) / (1000 * 60 * 60 * 24),
        ) + 1;
  };

  const setToInitialState = () => {
    setStack("");
    setPosition("");
    setMode("0");
    setLike(false);
    setRecruit(true);
  };

  useEffect(() => {
    if (data) {
      setIsInitialRender(false);
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
    if (!isInitialRender) {
      if (debouncedValue) {
        handleSteadySearch(debouncedValue);
      } else {
        handleGetSteadies(
          stack,
          position,
          mode,
          keyword,
          deadline,
          recruit,
          type,
          page.toString(),
          like,
        );
      }
    }
  }, [debouncedValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    if (!isInitialRender) {
      setPage(0);
      handleFilter(
        type,
        keyword,
        stack,
        position,
        mode,
        recruit,
        deadline,
        like,
      );
    }
  }, [type, stack, position, mode, recruit, deadline, debouncedValue, like]);

  useEffect(() => {
    sessionStorage.setItem("page", page.toString());
  }, [page]);

  useEffect(() => {
    if (sessionStorage.getItem("page")) {
      setPage(parseInt(sessionStorage.getItem("page")!));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setModalOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const bannerDefaultStyle =
    "duration-1500 absolute left-0 top-0 flex h-250 md:h-300 lg:h-350 w-full justify-center transition-opacity";
  const bannerValidStyle = "opacity-100 transition-opacity ease-in";
  const bannerInvalidStyle = "opacity-0 transition-opacity ease-out";

  return (
    <main className="relative flex flex-col items-center">
      <div className="relative flex h-250 w-screen transition md:h-300 lg:h-350">
        <div
          className={`${
            activeIndex === 1 ? bannerValidStyle : bannerInvalidStyle
          } ${bannerDefaultStyle} bg-banner-bg`}
        >
          <div className="flex w-3/5 items-center justify-around">
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-st-white md:text-3xl lg:text-4xl xl:text-5xl">
                스테디로
              </div>
              <div className="mt-10 text-2xl font-bold text-st-white md:text-3xl lg:text-4xl xl:text-5xl">
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
              <div className="text-2xl font-bold text-st-white md:text-3xl lg:text-4xl xl:text-5xl">
                스테디는
              </div>
              <div className="mt-10 text-2xl font-bold text-st-white md:text-3xl lg:text-4xl xl:text-5xl">
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
              <div className="text-2xl font-bold text-st-white md:text-3xl lg:text-4xl xl:text-5xl">
                스테디에
              </div>
              <div className="mt-10 text-2xl font-bold text-st-white md:text-3xl lg:text-4xl xl:text-5xl">
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
          className={`h-7 w-7 rounded-full md:h-10 md:w-10 ${
            activeIndex === 0 ? "bg-st-gray-400" : "bg-st-gray-100"
          } cursor-pointer`}
          onClick={() => setActiveIndex(0)}
        ></div>
        <div
          className={`h-7 w-7 rounded-full md:h-10 md:w-10 ${
            activeIndex === 1 ? "bg-st-gray-400" : "bg-st-gray-100"
          } cursor-pointer`}
          onClick={() => setActiveIndex(1)}
        ></div>
        <div
          className={`h-7 w-7 rounded-full md:h-10 md:w-10 ${
            activeIndex === 2 ? "bg-st-gray-400" : "bg-st-gray-100"
          } cursor-pointer`}
          onClick={() => setActiveIndex(2)}
        ></div>
      </div>
      <section className="mb-20 mt-50 flex flex-col flex-wrap items-center justify-center overflow-hidden">
        <div className="w-3/4 text-xl font-bold md:text-2xl xl:w-full">
          🔥 인기 스테디
        </div>
        <div className="mt-20 flex h-160 flex-wrap items-center justify-center overflow-hidden md:h-220">
          {popularSteadies.content.slice(0, 4).map((item, index) => (
            <Link
              key={item.id}
              href={`/steady/detail/${item.id}`}
            >
              <div className="relative m-20 flex h-120 w-210 cursor-pointer flex-col items-center justify-center gap-12 rounded-20 shadow-lg transition hover:scale-105 md:h-170 md:w-300 md:gap-20">
                {index <= 2 ? (
                  <Image
                    src={rankImageArray[index].image}
                    alt="rank image"
                    className="absolute left-0 top-0 h-30 w-30 md:h-45 md:w-45"
                  />
                ) : (
                  ""
                )}
                <div className="flex w-170 items-center justify-end md:w-210 md:w-250">
                  <div className="flex h-20 w-40 items-center justify-center rounded-20 border border-st-red shadow-md md:h-28 md:w-60">
                    <div className="h-16 w-36 rounded-20 bg-st-red text-center text-12 font-bold text-st-white md:h-22 md:w-54 md:text-16">
                      D-{calcDateDifference(item.deadline)}
                    </div>
                  </div>
                </div>
                <div className="w-3/4 overflow-ellipsis text-15 font-bold md:text-18">
                  <div className="text-9 font-bold md:text-12">
                    {item.type === "STUDY" ? "📖 스터디" : "🖥 프로젝트"}
                  </div>
                  {item.title}
                </div>
                <div className="flex justify-between gap-30 md:gap-40">
                  <div className="text-12 font-bold text-st-gray-100 md:text-16">
                    마감일 | {item.deadline}
                  </div>
                  <div className="flex items-center justify-center gap-5 text-12 font-bold text-st-gray-100 md:text-16">
                    <Icon
                      name="eye"
                      size={20}
                      color="text-st-gray-100"
                    />
                    {item.viewCount}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="flex w-3/4 flex-col items-center xl:w-1300">
        <div className="flex w-full flex-col items-center justify-center gap-25 md:p-20">
          <div className="flex gap-30">
            <div
              className={`${
                type === "all" ? "" : "text-st-gray-100"
              } cursor-pointer text-2xl font-bold md:text-3xl`}
              onClick={() => setType("all")}
            >
              전체
            </div>
            <div
              className={`${
                type === "STUDY" ? "" : "text-st-gray-100"
              } cursor-pointer text-2xl font-bold md:text-3xl`}
              onClick={() => setType("STUDY")}
            >
              스터디
            </div>
            <div
              className={`${
                type === "PROJECT" ? "" : "text-st-gray-100"
              } cursor-pointer text-2xl font-bold md:text-3xl`}
              onClick={() => setType("PROJECT")}
            >
              프로젝트
            </div>
          </div>
          <input
            ref={inputRef}
            className="bg-input-bg h-40 w-full rounded-12 border-3 border-st-gray-100 px-10 py-20 text-center text-20 font-bold outline-none transition-all duration-300 focus:border-st-primary sm:w-500 md:w-700"
            type="text"
            placeholder="검색어를 입력해주세요."
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="m-10 flex w-full justify-center md:justify-between">
          <div className="hidden md:flex md:flex-wrap xl:flex xl:items-center xl:justify-center xl:gap-5">
            <MultiSelector
              initialLabel={"기술 스택"}
              items={stacks.stacks.map((stack) => ({
                value: stack.id.toString(),
                label: stack.name,
              }))}
              onSelectedChange={(value) =>
                setStack(value.map((item) => item.label).join(","))
              }
              className="w-220"
            />
            <MultiSelector
              initialLabel={"모집 분야"}
              items={positions.positions.map((position) => ({
                value: position.name,
                label: position.name,
              }))}
              onSelectedChange={(value) =>
                setPosition(value.map((item) => item.label).join(","))
              }
              className="w-220"
            />
            <SingleSelector
              initialLabel={"진행 방식"}
              items={steadyRunningMethods}
              className="mb-8 h-43 w-220"
              onSelectedChange={(value) => setMode(value)}
            />
            <div
              className={`${
                like ? "border-5 border-st-yellow" : "border border-st-gray-100"
              } transition-border mb-8 flex h-43 w-150 items-center justify-center rounded-5 duration-100`}
            >
              {isAuth && (
                <button
                  className="h-full w-full font-bold"
                  onClick={() => setLike(!like)}
                >
                  💛 내 좋아요
                </button>
              )}
              {!isAuth && (
                <AlertModal
                  actionButton={
                    <LoginModal
                      trigger={
                        <Button
                          className={cn(
                            `bg-st-primary ${buttonSize.sm} items-center justify-center text-st-white`,
                          )}
                        >
                          로그인
                        </Button>
                      }
                    />
                  }
                  trigger={
                    <button className="h-full w-full font-bold">
                      💛 내 좋아요
                    </button>
                  }
                >
                  <div className="text-center text-18 font-bold">
                    로그인이 필요한 기능입니다! <br />
                    로그인 하시겠어요?
                  </div>
                </AlertModal>
              )}
            </div>
            <div
              className={`${
                recruit
                  ? "border-5 border-st-primary"
                  : "border border-st-gray-100"
              } transition-border mb-8 flex h-43 w-100 items-center justify-center rounded-5 duration-100`}
            >
              <button
                className="h-full w-full font-bold"
                onClick={() => setRecruit(!recruit)}
              >
                모집중
              </button>
            </div>
          </div>
          <div className="flex w-full justify-center gap-20 md:hidden">
            {isAuth && (
              <Link
                href={"/steady/create"}
                className="w-3/4 sm:w-390"
              >
                <button className="h-40 w-full rounded-10 bg-st-primary font-bold text-st-white hover:bg-st-skyblue-300 ">
                  스테디 등록
                </button>
              </Link>
            )}
            {!isAuth && (
              <AlertModal
                actionButton={
                  <LoginModal
                    trigger={
                      <Button
                        className={cn(
                          `bg-st-primary ${buttonSize.sm} items-center justify-center text-st-white`,
                        )}
                      >
                        로그인
                      </Button>
                    }
                  />
                }
                trigger={
                  <button className="h-40 w-3/4 rounded-10 bg-st-primary font-bold text-st-white hover:bg-st-skyblue-300 sm:w-390">
                    스테디 등록
                  </button>
                }
              >
                <div className="text-center text-18 font-bold">
                  로그인이 필요한 기능입니다! <br />
                  로그인 하시겠어요?
                </div>
              </AlertModal>
            )}
            <button
              onClick={() => setModalOpen(true)}
              className="h-40 w-1/4 rounded-10 bg-st-primary font-bold text-st-white hover:bg-st-skyblue-300 sm:w-90"
            >
              필터
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-20">
            <div
              onClick={() => setDeadline(!deadline)}
              className={`${
                deadline ? "" : "text-st-gray-100"
              } flex w-85 cursor-pointer items-center justify-center gap-5 text-15 font-bold xl:w-100 xl:gap-10 xl:text-18`}
            >
              <div
                className={`${
                  deadline ? "bg-st-primary" : "bg-st-gray-100"
                } h-7 w-7 rounded-full`}
              ></div>
              마감 임박순
            </div>
            {isAuth && (
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
            )}
            {!isAuth && (
              <AlertModal
                actionButton={
                  <LoginModal
                    trigger={
                      <Button
                        className={cn(
                          `bg-st-primary ${buttonSize.sm} items-center justify-center text-st-white`,
                        )}
                      >
                        로그인
                      </Button>
                    }
                  />
                }
                trigger={
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
                }
              >
                <div className="text-center text-18 font-bold">
                  로그인이 필요한 기능입니다! <br />
                  로그인 하시겠어요?
                </div>
              </AlertModal>
            )}
          </div>
        </div>
        <div className="h-5 w-full bg-st-gray-400" />
        <Posts info={post as Steadies} />
        <div className="h-5 w-full bg-st-gray-400" />
      </section>
      <section className="flex h-100 w-full items-center justify-center">
        <Pagination
          stack={stack}
          position={position}
          mode={mode}
          keyword={keyword}
          deadline={deadline}
          recruit={recruit}
          type={type}
          totalPost={totalPost as number}
          like={like}
          setPost={setPost as Dispatch<SetStateAction<Steadies>>}
        />
      </section>
      <div className="fixed bottom-100 z-10 flex w-full justify-between gap-10 px-20 md:bottom-40 md:right-10 md:w-auto md:justify-end">
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
        <Sheet
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col items-center gap-5">
                  <div className="flex flex-col justify-center gap-20">
                    <div className="flex flex-col items-center justify-center gap-20 text-25 font-bold">
                      기술 스택
                      <MultiSelector
                        initialLabel={"기술 스택"}
                        items={stacks.stacks.map((stack) => ({
                          value: stack.id.toString(),
                          label: stack.name,
                        }))}
                        onSelectedChange={(value) =>
                          setStack(value.map((item) => item.label).join(","))
                        }
                        className="w-300"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-20 text-25 font-bold">
                      모집 분야
                      <MultiSelector
                        initialLabel={"모집 분야"}
                        items={positions.positions.map((position) => ({
                          value: position.name,
                          label: position.name,
                        }))}
                        onSelectedChange={(value) =>
                          setPosition(value.map((item) => item.label).join(","))
                        }
                        className="w-300"
                      />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-20 text-25 font-bold">
                      진행 방식
                      <div className="flex items-center justify-center gap-20 text-17">
                        <div
                          className={`${
                            mode === "0" ? "" : "text-st-gray-100"
                          } cursor-pointer`}
                          onClick={() => setMode("0")}
                        >
                          전체
                        </div>
                        <div
                          className={`${
                            mode === "offline" ? "" : "text-st-gray-100"
                          } cursor-pointer`}
                          onClick={() => setMode("offline")}
                        >
                          오프라인
                        </div>
                        <div
                          className={`${
                            mode === "online" ? "" : "text-st-gray-100"
                          } cursor-pointer`}
                          onClick={() => setMode("online")}
                        >
                          온라인
                        </div>
                        <div
                          className={`${
                            mode === "both" ? "" : "text-st-gray-100"
                          } cursor-pointer`}
                          onClick={() => setMode("both")}
                        >
                          혼합
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-20 text-25 font-bold">
                      모집 현황
                      <div className="flex items-center justify-center gap-20">
                        <div
                          className={`${
                            recruit
                              ? "border-5 border-st-primary"
                              : "border border-st-gray-100"
                          } transition-border mb-8 flex h-43 w-100 items-center justify-center rounded-5 duration-100`}
                        >
                          <button
                            className="h-full w-full text-15 font-bold"
                            onClick={() => setRecruit(true)}
                          >
                            모집중
                          </button>
                        </div>
                        <div
                          className={`${
                            !recruit
                              ? "border-5 border-st-red"
                              : "border border-st-gray-100"
                          } transition-border mb-8 flex h-43 w-100 items-center justify-center rounded-5 duration-100`}
                        >
                          <button
                            className="h-full w-full text-15 font-bold"
                            onClick={() => setRecruit(false)}
                          >
                            전체
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-center gap-20 p-20">
                  <div className="mb-8 flex h-43 w-200 items-center justify-center rounded-10 shadow-md">
                    <button
                      className="h-full w-full rounded-10 font-bold hover:bg-st-green hover:text-st-white"
                      onClick={() => {
                        setModalOpen(false);
                      }}
                    >
                      필터 적용
                    </button>
                  </div>
                  <div className="mb-8 flex h-43 w-200 items-center justify-center rounded-10 shadow-md">
                    <button
                      className="h-full w-full rounded-10 font-bold hover:bg-st-red hover:text-st-white"
                      onClick={() => {
                        setToInitialState();
                        setModalOpen(false);
                      }}
                    >
                      초기화
                    </button>
                  </div>
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
        <WelcomeModal />
      </div>
    </main>
  );
};

export default Home;
