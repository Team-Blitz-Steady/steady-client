import { axiosInstance, isAbnormalCode } from "@/services";
import type { CreateSteadyRequestBodyType } from "@/services/types";

const createSteady = async (data: CreateSteadyRequestBodyType) => {
  try {
    const response = await axiosInstance.post("/api/v1/steadies", data);
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch create steady api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default createSteady;
