"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { AlertDialog } from "@radix-ui/themes";
import Button, { buttonSize } from "../../Button";

interface AlertModalProps {
  actionButton: JSX.Element;
  trigger: ReactNode;
}

const AlertModal = ({
  children,
  actionButton,
  trigger,
}: PropsWithChildren<AlertModalProps>) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content className="max-mobile:h-1/4 max-mobile:w-3/4 max-mobile:p-10 flex h-250 w-400 items-center justify-center rounded-20 bg-st-primary">
        <div className="max-mobile:h-full max-mobile:w-full flex h-200 w-350 flex-col rounded-15 bg-st-white p-20">
          <div className="flex grow flex-col items-center justify-center">
            {children}
          </div>
          <div className="flex items-center justify-center gap-20">
            <AlertDialog.Cancel>
              <Button className={`${buttonSize.sm} text-black bg-st-white `}>
                취소
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>{actionButton}</AlertDialog.Action>
          </div>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default AlertModal;
