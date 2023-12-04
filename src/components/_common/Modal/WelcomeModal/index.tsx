"use client";

import useWelcomeModalOpenStore from "@/stores/welcomeModalOpen";
import { AlertDialog } from "@radix-ui/themes";
import Icon from "../../Icon";
import WelcomeModalContainer from "./WelcomeModalContainer";

const WelcomeModal = () => {
  const { isOpen, setIsOpen } = useWelcomeModalOpenStore();

  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AlertDialog.Content className="max-mobile:h-3/4 max-mobile:w-screen max-mobile:p-10 flex h-700 w-650 items-center justify-center overflow-y-hidden rounded-20 bg-st-primary">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-20 bg-st-white p-20">
          <AlertDialog.Cancel onClick={() => setIsOpen(false)}>
            <div className="flex w-full cursor-pointer justify-end">
              <Icon
                name="cross"
                size={20}
                color="text-black"
              />
            </div>
          </AlertDialog.Cancel>
          <WelcomeModalContainer />
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default WelcomeModal;
