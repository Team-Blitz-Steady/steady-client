import { axiosInstance, isAbnormalCode } from "@/services";
import type { AxiosResponse } from "axios";

const deleteTemplate = async (id: string) => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/api/v1/template/${id}`,
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch delete template api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteTemplate;
