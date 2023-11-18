import type { PositionResponse } from "@/services/types";
import { axiosInstance } from "..";

const getPositions = async () => {
  try {
    const response =
      await axiosInstance.get<PositionResponse>("/api/v1/positions");
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch positions api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getPositions;
