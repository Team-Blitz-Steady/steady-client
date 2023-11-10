import { axiosInstance } from "@/services";
import type { SteadyDetailsType } from "@/services/types";

const createSteady = async (data: Partial<SteadyDetailsType>) => {
  try {
    const response = await axiosInstance.post("/api/v1/steadies", data);
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch create steady api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default createSteady;
