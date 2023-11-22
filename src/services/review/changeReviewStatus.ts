import type { AxiosResponse } from "axios";
import { axiosInstance, isAbnormalCode } from "..";
import type { ReviewStatusType } from "../types";

const changeReviewStatus = async (reviewId: string) => {
  try {
    const response: AxiosResponse<ReviewStatusType> = await axiosInstance.patch(
      `/api/v1/reviews/${reviewId}`,
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch review status api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default changeReviewStatus;
