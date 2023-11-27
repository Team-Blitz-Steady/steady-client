import { create } from "zustand";

interface isOpenStateType {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}

const useLoginModalOpenStore = create<isOpenStateType>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export default useLoginModalOpenStore;
