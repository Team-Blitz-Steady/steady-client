"use client";

import { useState } from "react";
import Image from "next/image";
import KakaoLogo from "@/images/kakaoLogo.png";
import SteadyLogo from "@/images/steadyturtle.png";
import { cn } from "@/lib/utils";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import Input from "@/components/_common/Input";
import { AlertModal } from "@/components/_common/Modal";

const subTitleTextStyles = "text-23 font-bold";
const subContentStyles = "flex flex-col gap-30";
const subContentTextStyles = "text-lg font-bold";
const subBoxStyles =
  "px-30 py-20 gap-30 flex h-116 w-718 items-center  rounded-6 border-2 border-st-gray-100";

const MyProfilePage = () => {
  const [edit, setEdit] = useState(false);

  const handleClick = () => {
    setEdit((prev) => !prev);
  };

  return (
    <div className="flex h-full flex-col gap-100">
      <div className="flex flex-col gap-20">
        <div className="text-30 font-bold">내 프로필</div>
        <div className="flex flex-col items-center justify-center gap-20">
          <label
            htmlFor="profile"
            className="group relative flex cursor-pointer items-center justify-center transition-transform"
          >
            <Image
              src={SteadyLogo}
              alt={"내 프로필 이미지"}
              width={150}
              height={150}
              className="border-black rounded-full border-2 transition-opacity group-hover:opacity-50"
            />
            <div className="absolute top-1/2 flex -translate-y-1/2 transform flex-col items-center justify-center text-center text-lg font-semibold opacity-0 transition-opacity group-hover:opacity-100">
              클릭하여
              <div className="flex flex-row items-center justify-center">
                수정
                <Icon
                  name="pencil"
                  size={20}
                  color="text-st-black"
                />
              </div>
            </div>
          </label>
          <input
            type="file"
            id="profile"
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-row items-center justify-center gap-10">
            {edit ? (
              <div className="flex flex-row items-center justify-center gap-10">
                <Input inputName="name-input" />
                {/* 닉네임 중복 확인 */}
                <button>중복 확인</button>
                <button onClick={handleClick}>
                  {/* 닉네임 중복 확인 되면 체크 표시 활성화*/}
                  <Icon
                    name="check"
                    size={30}
                    color="text-st-black"
                  />
                </button>
              </div>
            ) : (
              <>
                {/* TODO: 닉네임 state로 관리 */}
                <div className="text-25 font-bold">{"스테디"}</div>
                <button onClick={handleClick}>
                  <Icon
                    name="pencil"
                    size={30}
                    color="text-st-black"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={subContentStyles}>
        <div className={subTitleTextStyles}>한 줄 소개</div>
        <div className="flex items-center justify-center">
          <Input inputName="introduce-input" />
        </div>
      </div>
      <div className={subContentStyles}>
        <div className={subTitleTextStyles}>소셜 인증</div>
        <div className={subBoxStyles}>
          <Image
            src={KakaoLogo}
            alt="카카오 로고"
          />
          <div className={cn(subContentTextStyles, "flex-grow text-center")}>
            카카오 인증이 완료되었습니다. ✅
          </div>
        </div>
      </div>
      <div className={subContentStyles}>
        <div className={subTitleTextStyles}>회원 탈퇴</div>
        <div className={cn(subBoxStyles, "justify-between")}>
          <div className={subContentTextStyles}>
            회원 탈퇴 시 전체 프로필 정보가 삭제 됩니다.
          </div>
          <AlertModal
            trigger={
              <Button className={`${buttonSize.md} bg-st-red text-st-white`}>
                회원 탈퇴
              </Button>
            }
            actionButton={
              <Button className={`${buttonSize.sm} bg-st-red text-st-white`}>
                탈퇴
              </Button>
            }
          >
            정말 스테디를 탈퇴하시겠습니까?
          </AlertModal>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
