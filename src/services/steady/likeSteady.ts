import type { AxiosResponse } from "axios";
import { axiosInstance, isAbnormalCode } from "..";
import type { LikeSteadyType } from "../types";

const likeSteady = async (steadyId: string) => {
  try {
    const response: AxiosResponse<LikeSteadyType> = await axiosInstance.patch(
      `/api/v1/steadies/${steadyId}/like`,
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch like steady api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default likeSteady;
