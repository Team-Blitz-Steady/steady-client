import { create } from "zustand";

interface isFocusStateType {
  isFocus: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsFocus: (isFocus: boolean) => void;
}

const useIsSearchBarFocusStore = create<isFocusStateType>((set) => ({
  isFocus: false,
  setIsFocus: (isFocus) => set({ isFocus }),
}));

export default useIsSearchBarFocusStore;
