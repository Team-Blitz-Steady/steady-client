import type { AxiosResponse } from "axios";
import { axiosInstance, isAbnormalCode } from "..";
import type { ReviewCardsType } from "../types";

const getReviewCards = async () => {
  try {
    const response: AxiosResponse<ReviewCardsType> =
      await axiosInstance.get(`/api/v1/cards`);
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch review steady information api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getReviewCards;
