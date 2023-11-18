import { axiosInstance } from "@/services";
import type { Steadies } from "@/services/types";

const getSteadies = async (type: string, page: string): Promise<Steadies> => {
  try {
    if (type === "all") {
      const response = await axiosInstance.get(
        `/api/v1/steadies/search?page=${page}&like=false`,
      );
      return response.data;
    } else {
      const response = await axiosInstance.get(
        `/api/v1/steadies/search?page=${page}&like=false&steadyType=${type}`,
      );
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getSteadies;
