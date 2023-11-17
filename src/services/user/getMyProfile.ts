import type { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import type { MyProfileType } from "../types";

const getMyProfile = async () => {
  try {
    const response: AxiosResponse<MyProfileType> = await axiosInstance.get(
      "/api/v1/user/profile",
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch my profile api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getMyProfile;
