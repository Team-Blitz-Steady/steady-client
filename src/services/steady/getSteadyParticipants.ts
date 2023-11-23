import { axiosInstance, isAbnormalCode } from "@/services";
import type { AxiosResponse } from "axios";
import type { SteadyParticipantsType } from "../types";

const getSteadyParticipants = async (steadyId: string) => {
  try {
    const response: AxiosResponse<SteadyParticipantsType> =
      await axiosInstance.get(`/api/v1/steadies/${steadyId}/participants`);
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch steady participants api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getSteadyParticipants;
