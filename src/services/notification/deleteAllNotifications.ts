import { axiosInstance, isAbnormalCode } from "@/services";

const deleteAllNotifications = async () => {
  try {
    const response = await axiosInstance.delete(
      "/api/v1/notifications/deleteAll",
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch delete all notifications api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteAllNotifications;
