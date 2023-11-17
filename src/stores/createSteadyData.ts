import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SteadyStateType } from "@/constants/schemas/steadySchema";

const CreateSteadyStorageKey = "create-steady-key";

interface CreateSteadyState {
  steadyState: SteadyStateType;
  // eslint-disable-next-line no-unused-vars
  setSteadyState: (steadyState: SteadyStateType) => void;
}

const useCreateSteadyStore = create(
  persist<CreateSteadyState>(
    (set) => ({
      steadyState: {} as SteadyStateType,
      setSteadyState: (steadyState: SteadyStateType) => set({ steadyState }),
    }),
    {
      name: CreateSteadyStorageKey,
    },
  ),
);

export default useCreateSteadyStore;
