import { axiosInstance } from "@/services";
import type { AxiosResponse } from "axios";
import type { TemplateType } from "../types";

const getTemplates = async () => {
  try {
    const response: AxiosResponse<TemplateType> =
      await axiosInstance.get(`/api/v1/template`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getTemplates;
