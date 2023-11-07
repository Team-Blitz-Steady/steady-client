import type { Steadies } from "@/lib/steady/SteadyType";
import { baseInstance } from "@/services";

export const SteadiesApi = {
  GET_STEADIES: async (): Promise<Steadies[]> => {
    const response = await baseInstance.get("/api/v1/steadies");
    return response.data;
  },
};
