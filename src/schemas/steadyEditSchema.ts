import { SteadySchema } from "@/schemas/steadySchema";
import * as z from "zod";

export const SteadyEditSchema = SteadySchema.extend({
  status: z.string(),
});

export type SteadyEditStateType = z.infer<typeof SteadyEditSchema>;
