import type { PropsWithChildren, ReactNode } from "react";
import { Dialog } from "@radix-ui/themes";
import Icon from "../../Icon";

const UserModal = ({
  children,
  trigger,
}: PropsWithChildren<{ trigger: ReactNode }>) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content className="max-mobile:h-1/2 max-mobile:w-5/6 max-mobile:p-10 flex h-650 w-500 items-center justify-center rounded-20 bg-st-primary max-sm:h-600 max-sm:w-400 max-sm:overflow-hidden">
        <div className="max-mobile:h-full max-mobile:w-full flex h-600 w-450 flex-col rounded-20 bg-st-white p-20 max-sm:h-550 max-sm:w-350">
          <Dialog.Close>
            <div className="flex justify-end">
              <button className="h-fit w-fit">
                <Icon
                  name="cross"
                  size={20}
                  color="text-black"
                />
              </button>
            </div>
          </Dialog.Close>
          <div className="flex h-full flex-grow flex-col items-center justify-center overflow-hidden">
            {children}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserModal;
