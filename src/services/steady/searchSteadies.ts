import { axiosInstance } from "..";
import type { Steadies } from "../types";

const searchSteadies = async (
  page: string,
  keyword: string,
): Promise<Steadies> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/steadies/search?page=${page}&like=false&keyword=${keyword}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default searchSteadies;
