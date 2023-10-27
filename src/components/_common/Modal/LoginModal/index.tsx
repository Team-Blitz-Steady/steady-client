"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { AlertDialog } from "@radix-ui/themes";
import Icon from "../../Icon";

const LoginModal = ({
  children,
  trigger,
}: PropsWithChildren<{ trigger: ReactNode }>) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content className="flex h-700 w-650 items-center justify-center rounded-20 bg-st-primary max-mobile:h-3/4 max-mobile:w-screen max-mobile:p-10">
        <div className="h-650 w-600 flex-col rounded-20 bg-st-white p-20 max-mobile:h-full max-mobile:w-full">
          <AlertDialog.Cancel>
            <div className="flex justify-end">
              <button className="h-fit w-fit">
                <Icon
                  name="cross"
                  size={20}
                  color="text-black"
                />
              </button>
            </div>
          </AlertDialog.Cancel>
          {children}
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default LoginModal;
