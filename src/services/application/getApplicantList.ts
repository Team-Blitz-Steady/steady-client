import type { AxiosResponse } from "axios";
import { axiosInstance, isAbnormalCode } from "..";
import type { ApplicantListType } from "../types";

const getApplicantList = async (steadyId: string, pageParam: number) => {
  try {
    const response: AxiosResponse<ApplicantListType> = await axiosInstance.get(
      `/api/v1/steadies/${steadyId}/applications`,
      {
        params: { page: pageParam },
      },
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch steady detail api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getApplicantList;
