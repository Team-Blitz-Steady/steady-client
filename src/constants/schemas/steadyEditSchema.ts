import * as z from "zod";
import { SteadySchema } from "@/constants/schemas/steadySchema";

export const SteadyEditSchema = SteadySchema.extend({
  status: z.string(),
});

export type SteadyEditStateType = z.infer<typeof SteadyEditSchema>;
