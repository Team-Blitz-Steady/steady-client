import { axiosInstance } from "@/services";
import type { AxiosResponse } from "axios";
import type { SteadyDetailsType } from "../types";

const getSteadyDetails = async (steadyId: string) => {
  try {
    const response: AxiosResponse<SteadyDetailsType> = await axiosInstance.get(
      `/api/v1/steadies/${steadyId}`,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch steady detail api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getSteadyDetails;
