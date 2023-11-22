"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { Dialog } from "@radix-ui/themes";
import Button, { buttonSize } from "../../Button";

const InfoModal = ({
  children,
  trigger,
}: PropsWithChildren<{ trigger: ReactNode }>) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content className="max-mobile:h-1/2 max-mobile:w-5/6 max-mobile:p-10 flex h-650 w-400 items-center justify-center rounded-20 bg-st-primary">
        <div className="max-mobile:h-full max-mobile:w-full flex h-600 w-350 flex-col rounded-20 bg-st-white p-20">
          <div className="flex grow flex-col items-center justify-between">
            {children}
            <Dialog.Close>
              <Button
                className={`${buttonSize.sm} bg-st-primary text-center text-15 font-bold text-st-white`}
              >
                닫기
              </Button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default InfoModal;
