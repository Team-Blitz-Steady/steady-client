import { axiosInstance, isAbnormalCode } from "@/services";
import type { ImageUrlResponse } from "@/services/types";

const getProfileImageLink = async (filename: string) => {
  try {
    const res = await axiosInstance.get<ImageUrlResponse>(
      `/api/v1/user/profile/image?fileName=${filename}`,
    );
    if (isAbnormalCode(res.status)) {
      throw new Error("Failed to fetch profile image links!");
    }
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getProfileImageLink;
