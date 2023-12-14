"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import ErrorLogo from "@/images/DeleteUser.svg";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "@/services/types";
import Button, { buttonSize } from "@/components/_common/Button";

const Error = ({
  error,
}: {
  error: AxiosError<ErrorResponse>;
  reset: VoidFunction;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    if (
      error.response?.status === 401 &&
      (error.response.data.code === "A002" ||
        error.response.data.code === "A003" ||
        error.response.data.code === "A004")
    ) {
      toast({
        description:
          "로그인 정보가 만료되거나 유효하지 않습니다. 다시 로그인해주세요.",
        variant: "red",
      });
      router.push("/logout");
    }
  }, [error]);
  return (
    <div className="flex h-750 flex-col items-center justify-center gap-30">
      <Image
        src={ErrorLogo}
        alt="에러 로고"
        width={200}
        height={100}
      />
      <div className="font-bold max-sm:text-26 sm:text-26 md:text-26 lg:text-28 xl:text-30">
        알 수 없는 에러가 발생했습니다.
      </div>
      <div className="flex gap-20">
        <Button
          className={`${buttonSize.md} bg-st-primary text-st-white`}
          onClick={() => location.reload()}
        >
          새로고침
        </Button>
        <Button
          className={`${buttonSize.md} bg-st-primary text-st-white`}
          onClick={() => router.replace("/")}
        >
          홈으로
        </Button>
      </div>
    </div>
  );
};

export default Error;
