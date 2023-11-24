import { axiosInstance, isAbnormalCode } from "..";

const deleteMyProfile = async () => {
  try {
    const response = await axiosInstance.delete("/api/v1/user");
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch delete my profile api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteMyProfile();
