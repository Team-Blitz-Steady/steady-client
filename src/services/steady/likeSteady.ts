import type { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import type { LikeSteadyType } from "../types";

const likeSteady = async (steadyId: string) => {
  try {
    const response: AxiosResponse<LikeSteadyType> = await axiosInstance.patch(
      `/api/v1/steadies/${steadyId}/like`,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch like steady api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default likeSteady;
