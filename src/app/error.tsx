"use client";

import Image from "next/image";
import Link from "next/link";
import ErrorLogo from "@/images/DeleteUser.svg";
import Button, { buttonSize } from "@/components/_common/Button";

const Error = () => {
  return (
    <div className="flex h-750 flex-col items-center justify-center gap-30">
      <Image
        src={ErrorLogo}
        alt="에러 로고"
        width={200}
        height={100}
      />
      <div className="text-30 font-bold">알 수 없는 에러가 발생했습니다.</div>
      <Button className={`${buttonSize.md} bg-st-primary text-st-white`}>
        <Link
          href={"/"}
          replace={true}
        >
          홈으로
        </Link>
      </Button>
    </div>
  );
};

export default Error;
