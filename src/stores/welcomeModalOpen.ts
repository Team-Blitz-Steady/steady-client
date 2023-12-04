import { create } from "zustand";
import { persist } from "zustand/middleware";

interface isOpenStateType {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}

const useWelcomeModalOpenStore = create(
  persist<isOpenStateType>(
    (set) => ({
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "welcomeModalKey",
    },
  ),
);

export default useWelcomeModalOpenStore;
