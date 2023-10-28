import { create } from "zustand";
import { persist } from "zustand/middleware";

const StorageKey = "loginSteps-key";

interface LoginStepsState {
  steps: number;
  setIncreaseSteps: VoidFunction;
  setDecreaseSteps: VoidFunction;
}

const useLoginStepsStore = create(
  persist<LoginStepsState>(
    (set, get) => ({
      steps: 1,
      setIncreaseSteps: () => set({ steps: get().steps + 1 }),
      setDecreaseSteps: () => set({ steps: get().steps - 1 }),
    }),
    {
      name: StorageKey,
    },
  ),
);

export default useLoginStepsStore;
