import { axiosInstance, isAbnormalCode } from "@/services";
import type { AxiosResponse } from "axios";
import type { ApplicationDetailsType } from "../types";

const getApplicationDetails = async (applicationId: string) => {
  try {
    const response: AxiosResponse<ApplicationDetailsType> =
      await axiosInstance.get(`/api/v1/applications/${applicationId}`);
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch application detail api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getApplicationDetails;
