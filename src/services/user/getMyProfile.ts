import type { AxiosResponse } from "axios";
import { axiosInstance, isAbnormalCode } from "..";
import type { MyProfileType } from "../types";

const getMyProfile = async () => {
  try {
    const response: AxiosResponse<MyProfileType> = await axiosInstance.get(
      "/api/v1/user/profile",
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch my profile api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getMyProfile;
