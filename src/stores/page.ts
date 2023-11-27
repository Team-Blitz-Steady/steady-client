import { create } from "zustand";

interface PageState {
  page: number;
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number) => void;
}

const usePageStore = create<PageState>((set) => ({
  page: 0,
  setPage: (page: number) => set(() => ({ page: page })),
}));

export default usePageStore;
