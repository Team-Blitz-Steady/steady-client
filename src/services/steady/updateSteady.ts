import type { SteadyEditStateType } from "@/schemas/steadyEditSchema";
import { axiosInstance } from "@/services";

const updateSteady = async (steadyId: number, data: SteadyEditStateType) => {
  try {
    const res = await axiosInstance.patch(`/api/v1/steadies/${steadyId}`, data);
    if (Math.floor(res.status / 10) !== 20) {
      throw new Error("Failed to fetch update steady api!");
    }
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default updateSteady;
