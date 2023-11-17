import type { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import type { UsersProfileType } from "../types";

const getUserProfile = async (userId: string) => {
  try {
    const response: AxiosResponse<UsersProfileType> = await axiosInstance.get(
      `/api/v1/user/${userId}/profile`,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch users profile api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserProfile;
