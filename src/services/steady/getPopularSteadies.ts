import { axiosInstance, isAbnormalCode } from "@/services";
import type { Steadies } from "@/services/types";

const getPopularSteadies = async (): Promise<Steadies> => {
  try {
    const response = await axiosInstance.get(
      "/api/v1/steadies/search?page=0&like=false&criteria=viewCount",
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch search steadies api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getPopularSteadies;
