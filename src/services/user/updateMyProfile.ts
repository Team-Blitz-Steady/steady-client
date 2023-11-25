import { axiosInstance, isAbnormalCode } from "..";
import type { UpdateMyProfileType } from "../types";

const updateMyProfile = async (payload: UpdateMyProfileType) => {
  try {
    const response = await axiosInstance.patch("/api/v1/user/profile", payload);
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch update my profile api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default updateMyProfile;
