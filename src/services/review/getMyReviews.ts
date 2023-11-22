import type { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import type { MyReviewsType } from "../types";

const getMyReviews = async () => {
  try {
    const response: AxiosResponse<MyReviewsType> =
      await axiosInstance.get("/api/v1/reviews/my");
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch my reviews api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getMyReviews;
