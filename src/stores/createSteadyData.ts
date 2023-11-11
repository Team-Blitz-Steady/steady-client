import type * as z from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SteadySchema } from "@/constants/schemas";

const CreateSteadyStorageKey = "create-steady-key";

interface CreateSteadyState {
  steadyState: z.infer<typeof SteadySchema>;
  // eslint-disable-next-line no-unused-vars
  setSteadyState: (steadyState: z.infer<typeof SteadySchema>) => void;
}

export const useCreateSteadyStore = create(
  persist<CreateSteadyState>(
    (set) => ({
      steadyState: {} as z.infer<typeof SteadySchema>,
      setSteadyState: (steadyState: z.infer<typeof SteadySchema>) =>
        set({ steadyState }),
    }),
    {
      name: CreateSteadyStorageKey,
    },
  ),
);

export default useCreateSteadyStore;
