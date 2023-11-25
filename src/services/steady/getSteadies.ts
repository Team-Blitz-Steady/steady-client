import { axiosInstance, isAbnormalCode } from "@/services";
import type { Steadies } from "@/services/types";

const getSteadies = async (
  stack: string,
  position: string,
  mode: string,
  keyword: string,
  deadline: boolean,
  recruit: boolean,
  type: string,
  page: string,
  like: boolean,
): Promise<Steadies> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/steadies/search?page=${page}&like=${like}${
        type !== "all" ? `&steadyType=${type}` : ""
      }${keyword !== "" ? `&keyword=${keyword}` : ""}${
        stack !== "" ? `&stack=${stack}` : ""
      }${position !== "" ? `&position=${position}` : ""}${
        mode !== "" ? `&steadyMode=${mode}` : ""
      }${recruit ? `&status=RECRUITING` : ""}${
        deadline ? `&direction=asc&criteria=deadline` : ""
      }`,
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
