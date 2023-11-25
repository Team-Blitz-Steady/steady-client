import { axiosInstance } from "@/services";
import type { Steadies } from "@/services/types";

const steadyFilter = async (
  type: string,
  keyword: string,
  stack: string,
  position: string,
  mode: string,
  status: boolean,
  deadline: boolean,
  like: boolean,
): Promise<Steadies> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/steadies/search?page=0&like=${like}${
        type !== "all" ? `&steadyType=${type}` : ""
      }${keyword !== "" ? `&keyword=${keyword}` : ""}${
        stack !== "" ? `&stack=${stack}` : ""
      }${position !== "" ? `&position=${position}` : ""}${
        mode !== "0" ? `&steadyMode=${mode}` : ""
      }${status ? `&status=RECRUITING` : ""}${
        deadline ? `&direction=asc&criteria=deadline` : ""
      }`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default steadyFilter;
