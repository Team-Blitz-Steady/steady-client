import { axiosInstance } from "..";
import type { Steadies } from "../types";

export const searchSteadies = async (
  keyword: string,
  page: string,
): Promise<Steadies> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/steadies/search?page=${page}&steadyMode=all&status=all&like=all&keyword=${keyword}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
