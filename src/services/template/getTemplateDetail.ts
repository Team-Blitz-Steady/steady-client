import { axiosInstance } from "@/services";
import type { AxiosResponse } from "axios";
import type { TemplateDetailType } from "../types";

const getTemplateDetail = async (id: string) => {
  try {
    const response: AxiosResponse<TemplateDetailType> = await axiosInstance.get(
      `/api/v1/template/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getTemplateDetail;
