import { create } from "zustand";
import { persist } from "zustand/middleware";

const StorageKey = "loginSteps-key";

interface LoginStepsState {
  steps: number;
  // eslint-disable-next-line no-unused-vars
  setSteps: (steps: number) => void;
  setIncreaseSteps: VoidFunction;
  setDecreaseSteps: VoidFunction;
}

// TODO: 로그인 연결하면 steps 0으로 수정
const useLoginStepsStore = create(
  persist<LoginStepsState>(
    (set, get) => ({
      steps: 0,
      setSteps: (steps) => set({ steps }),
      setIncreaseSteps: () => set({ steps: get().steps + 1 }),
      setDecreaseSteps: () => set({ steps: get().steps - 1 }),
    }),
    {
      name: StorageKey,
    },
  ),
);

export default useLoginStepsStore;
