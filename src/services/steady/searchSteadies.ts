import { axiosInstance } from "@/services";
import type { Steadies } from "@/services/types";

const searchSteadies = async (query: string): Promise<Steadies[]> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/steadies/search/${query}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default searchSteadies;
