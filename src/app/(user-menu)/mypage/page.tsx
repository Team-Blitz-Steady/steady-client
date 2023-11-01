"use client";

import { useState } from "react";
import Image from "next/image";
import SteadyLogo from "@/images/steadyturtle.png";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import Input from "@/components/_common/Input";

const MyProfilePage = () => {
  const [edit, setEdit] = useState(false);

  const handleClick = () => {
    setEdit(true);
  };

  return (
    <div>
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
              <>
                <button onClick={handleClick}>
                  <Icon
                    name="pencil"
                    size={30}
                    color="text-st-black"
                  />
                </button>
              </>
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
      <div>
        <div className="text-20 font-bold">한 줄 소개</div>
        <Input inputName="introduce-input" />
      </div>
      <div>
        <div className="text-20 font-bold">소셜 인증</div>
        <div></div>
      </div>
      <div>
        <div className="text-20 font-bold">회원 탈퇴</div>
        <div>
          회원 탈퇴 시 전체 프로필 정보가 삭제 됩니다.{" "}
          <Button className={`${buttonSize.md} bg-st-red text-st-white`}>
            회원 탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
