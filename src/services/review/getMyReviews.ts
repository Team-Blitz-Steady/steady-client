import type { AxiosResponse } from "axios";
import { axiosInstance, isAbnormalCode } from "..";
import type { MyReviewsType } from "../types";

const getMyReviews = async () => {
  try {
    const response: AxiosResponse<MyReviewsType> =
      await axiosInstance.get("/api/v1/reviews/my");
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch my reviews api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getMyReviews;
