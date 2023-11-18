import { axiosInstance } from "..";
import type { Steadies } from "../types";

const searchSteadies = async (keyword: string): Promise<Steadies> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/steadies/search?page=0&like=false&keyword=${keyword}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default searchSteadies;
