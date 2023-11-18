import { axiosInstance } from "..";
import type { UserProfileType } from "../types";

const createUserProfile = async ({
  accountId,
  nickname,
  positionId,
  stacksId,
}: UserProfileType) => {
  try {
    const response = await axiosInstance.post("/api/v1/user/profile", {
      accountId,
      nickname,
      positionId,
      stacksId,
    });
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch create user profile api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default createUserProfile;
