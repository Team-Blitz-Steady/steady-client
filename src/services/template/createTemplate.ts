import { axiosInstance } from "..";
import type { CreateTemplateType } from "../types";

export const createTemplate = (payload: CreateTemplateType): Promise<void> => {
  return axiosInstance.post("/api/v1/template", payload);
};
