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
      <Dialog.Content className="flex h-500 w-500 items-center justify-center rounded-20 bg-st-primary">
        <div className="flex h-450 w-450 flex-col rounded-20 bg-st-white p-20">
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
