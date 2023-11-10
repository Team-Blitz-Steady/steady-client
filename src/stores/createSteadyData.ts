import type * as z from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SteadySchema } from "@/constants/schemas";

const CreateSteadyStorageKey = "create-steady-key";

interface CreateSteadyState {
  initialValues: z.infer<typeof SteadySchema>;
  // eslint-disable-next-line no-unused-vars
  setInitialValues: (initialValues: z.infer<typeof SteadySchema>) => void;
}

export const useCreateSteadyStore = create(
  persist<CreateSteadyState>(
    (set) => ({
      initialValues: {} as z.infer<typeof SteadySchema>,
      setInitialValues: (initialValues: z.infer<typeof SteadySchema>) =>
        set({ initialValues }),
    }),
    {
      name: CreateSteadyStorageKey,
    },
  ),
);

export default useCreateSteadyStore;
