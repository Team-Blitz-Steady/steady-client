import { axiosInstance } from "@/services";
import type { AxiosResponse } from "axios";

const deleteApplication = async (applicationId: string) => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
      `/api/v1/applications/${applicationId}`,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to delete application!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteApplication;
