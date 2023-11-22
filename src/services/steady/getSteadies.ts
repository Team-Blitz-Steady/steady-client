import { axiosInstance, isAbnormalCode } from "@/services";
import type { Steadies } from "@/services/types";

const getSteadies = async (
  keyword: string,
  deadline: boolean,
  recruit: boolean,
  type: string,
  page: string,
): Promise<Steadies> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/steadies/search?page=${page}&like=false${
        type !== "all" ? `&steadyType=${type}` : ""
      }${recruit ? `&status=RECRUITING` : ""}${
        deadline ? `&direction=asc&criteria=deadline` : ""
      }${keyword !== "" ? `&keyword=${keyword}` : ""}`,
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

export default getSteadies;
