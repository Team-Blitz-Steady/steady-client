import { axiosInstance } from "..";
import type { UpdateMyProfileType } from "../types";

const updateMyProfile = async (payload: UpdateMyProfileType) => {
  try {
    const response = await axiosInstance.patch(
      "/api/v1/users/profile",
      payload,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch update my profile api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default updateMyProfile;
