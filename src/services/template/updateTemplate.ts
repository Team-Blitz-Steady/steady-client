import { axiosInstance } from "@/services";
import type { AxiosResponse } from "axios";
import type { CreateTemplateType } from "../types";

const updateTemplate = async (id: string, payload: CreateTemplateType) => {
  try {
    const response: AxiosResponse = await axiosInstance.patch(
      `/api/v1/template/${id}`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default updateTemplate;
