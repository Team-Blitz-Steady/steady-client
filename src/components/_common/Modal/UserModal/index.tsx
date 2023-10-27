"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@radix-ui/themes";
import Button, { buttonSize } from "../../Button";

const UserModal = ({
  children,
  trigger,
}: PropsWithChildren<{ trigger: ReactNode }>) => {
  const router = useRouter();
  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content className="flex h-550 w-500 items-center justify-center rounded-20 bg-st-primary">
        <div className="flex h-500 w-450 flex-col rounded-20 bg-st-white p-20">
          <Dialog.Close>
            <div className="flex justify-end">
              {/* TODO: X 아이콘으로 변경 */}
              <button className="h-fit w-fit">X</button>
            </div>
          </Dialog.Close>
          <div className="flex grow flex-col items-center justify-between">
            {children}
            {/* TODO: 해당 유저에 대한 페이지로 이동 시켜야 함 */}
            <Button
              onClick={() => router.push("/review")}
              className={`${buttonSize.sm} bg-st-primary text-center text-15 font-bold text-st-white`}
            >
              리뷰 보기
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserModal;
