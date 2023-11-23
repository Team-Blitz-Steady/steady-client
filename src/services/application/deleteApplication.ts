import { axiosInstance } from "@/services";
import type { AxiosResponse } from "axios";

const deleteTemplate = async (id: string) => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/api/v1/applications/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteTemplate;
