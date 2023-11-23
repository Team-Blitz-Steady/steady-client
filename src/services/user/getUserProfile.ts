import type { AxiosResponse } from "axios";
import { axiosInstance, isAbnormalCode } from "..";
import type { UsersProfileType } from "../types";

const getUserProfile = async (userId: string) => {
  try {
    const response: AxiosResponse<UsersProfileType> = await axiosInstance.get(
      `/api/v1/user/${userId}/profile`,
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch users profile api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserProfile;
