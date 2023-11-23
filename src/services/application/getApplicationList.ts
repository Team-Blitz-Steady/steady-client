import type { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import type { ApplicationList } from "../types";

const getApplicationList = async (page: number) => {
  try {
    const response: AxiosResponse<ApplicationList> = await axiosInstance.get(
      `/api/v1/applications/my-list`,
      {
        params: page,
      },
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch application list api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getApplicationList;
