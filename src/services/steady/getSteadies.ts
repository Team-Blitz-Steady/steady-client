import { axiosInstance } from "@/services";
import type { Steadies } from "@/services/types";

const getSteadies = async (page: string): Promise<Steadies> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/steadies/search?page=${page}&like=false`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getSteadies;
