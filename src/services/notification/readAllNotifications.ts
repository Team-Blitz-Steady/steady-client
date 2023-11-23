import { axiosInstance, isAbnormalCode } from "@/services";

const readAllNotifications = async () => {
  try {
    const response = await axiosInstance.patch("/api/v1/notifications/readAll");
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch read all notification api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default readAllNotifications;
