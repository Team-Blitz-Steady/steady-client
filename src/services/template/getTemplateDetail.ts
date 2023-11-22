import { axiosInstance, isAbnormalCode } from "@/services";
import type { AxiosResponse } from "axios";
import type { TemplateDetailType } from "../types";

const getTemplateDetail = async (id: string) => {
  try {
    const response: AxiosResponse<TemplateDetailType> = await axiosInstance.get(
      `/api/v1/template/${id}`,
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch template detail api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getTemplateDetail;
