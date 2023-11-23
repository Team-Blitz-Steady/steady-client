import type { PositionResponse } from "@/services/types";
import { axiosInstance, isAbnormalCode } from "..";

const getPositions = async () => {
  try {
    const response =
      await axiosInstance.get<PositionResponse>("/api/v1/positions");
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch positions api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getPositions;
