import type { AxiosResponse } from "axios";
import { axiosInstance, isAbnormalCode } from "..";
import type { MySteadyType } from "../types";

interface getMySteadiesProps {
  status?: string;
  page?: string;
  direction?: string;
}

const getMySteadies = async ({
  status,
  page,
  direction,
}: getMySteadiesProps) => {
  try {
    const response: AxiosResponse<MySteadyType> = await axiosInstance.get(
      "/api/v1/steadies/my",
      { params: { status, page, direction } },
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch my steady api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getMySteadies;
