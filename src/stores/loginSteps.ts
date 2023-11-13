import { create } from "zustand";
import { persist } from "zustand/middleware";

const StorageKey = "loginSteps";

interface LoginStepsStateType {
  steps: number;
  // eslint-disable-next-line no-unused-vars
  setSteps: (steps: number) => void;
  setIncreaseSteps: VoidFunction;
  setDecreaseSteps: VoidFunction;
}

const useLoginStepsStore = create(
  persist<LoginStepsStateType>(
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
