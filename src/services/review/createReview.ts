import { axiosInstance, isAbnormalCode } from "..";
import type { CreateReviewType } from "../types";

const createReview = async (steadyId: string, payload: CreateReviewType) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/steadies/${steadyId}/review`,
      payload,
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch create review api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default createReview;
