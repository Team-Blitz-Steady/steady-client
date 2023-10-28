import Image from "next/image";
import AppBar from "@/components/_common/AppBar";
import Button, { buttonSize } from "@/components/_common/Button";
import Input from "@/components/_common/Input";
import Line from "@/components/_common/Line";
import StickyButton from "@/components/_common/StickyButton";
import Turtle from "../../public/images/turtle.svg";

const Home = () => {
  return (
    <main className="flex flex-col items-center">
      <header className="flex w-screen justify-center">
        <AppBar isLogin={false} />
      </header>
      <div className="flex h-380 w-screen justify-center bg-banner-bg">
        <div className="flex w-3/5 items-center justify-around">
          <div className="flex flex-col">
            <div className="text-banner-text text-4xl font-bold">스테디로</div>
            <div className="text-banner-text mt-10 text-4xl font-bold">
              동료를 찾아보세요!
            </div>
          </div>
          <div>
            <Image
              src={Turtle}
              alt="Turtle"
            />
          </div>
        </div>
      </div>
      <section className="m-50 flex w-3/4 flex-col flex-wrap justify-center overflow-hidden">
        <div className="text-2xl font-bold">🔥 인기 스테디</div>
        <div className="flex justify-center">
          <div className="mx-10 h-170 w-300 rounded-20 bg-st-gray-50"></div>
          <div className="mx-10 h-170 w-300 rounded-20 bg-st-gray-50"></div>
          <div className="mx-10 h-170 w-300 rounded-20 bg-st-gray-50"></div>
          <div className="mx-10 h-170 w-300 rounded-20 bg-st-gray-50"></div>
        </div>
      </section>
      <section className="xl:w-1300 flex w-3/4 flex-col items-center">
        <div className="flex w-full justify-between p-20">
          <div className="flex gap-20">
            <div className="text-2xl font-bold">전체</div>
            <div className="text-2xl font-bold">스터디</div>
            <div className="text-2xl font-bold">프로젝트</div>
          </div>
          <Input inputName="search-input" />
        </div>
        <div className="m-10 flex w-full justify-between">
          <div className="flex gap-10">
            <div className="mx-10 h-40 w-150 rounded-10 bg-st-gray-50"></div>
            <div className="mx-10 h-40 w-150 rounded-10 bg-st-gray-50"></div>
            <div className="mx-10 h-40 w-150 rounded-10 bg-st-gray-50"></div>
            <div className="mx-10 h-40 w-150 rounded-10 bg-st-gray-50"></div>
          </div>
          <div>
            <Button className={`${buttonSize.xl} bg-st-primary`}>
              스테디 등록
            </Button>
          </div>
        </div>
        <Line className="h-5 w-full bg-st-gray-200" />
        <div className="h-1000 w-full bg-st-gray-50"></div>
        <Line className="h-5 w-full bg-st-gray-200" />
      </section>
      <section className="h-100 w-full">pagination</section>
      <footer className="h-200 w-screen bg-st-gray-100"></footer>
      <StickyButton />
    </main>
  );
};

export default Home;
