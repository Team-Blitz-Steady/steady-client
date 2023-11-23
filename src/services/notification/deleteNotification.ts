import { axiosInstance, isAbnormalCode } from "@/services";

const deleteNotification = async (notificationId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/notifications/${notificationId}`,
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch delete notification api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteNotification;
