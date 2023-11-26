import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePage = create(
  persist(
    (set) => ({
      pageState: 0,
      increment: () => set((state: number) => ({ pageState: state + 1 })),
      decrement: () => set((state: number) => ({ pageState: state - 1 })),
    }),
    {
      name: "page",
      getStorage: () => sessionStorage,
    },
  ),
);

export default usePage;
