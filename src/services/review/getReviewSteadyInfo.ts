import type { AxiosResponse } from "axios";
import { axiosInstance, isAbnormalCode } from "..";
import type { ReviewSteadyInfoType } from "../types";

const getReviewSteadyInfo = async (steadyId: string) => {
  try {
    const response: AxiosResponse<ReviewSteadyInfoType> =
      await axiosInstance.get(`/api/v1/steadies/${steadyId}/review`);
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch review steady information api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getReviewSteadyInfo;
