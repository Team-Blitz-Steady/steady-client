import { axiosInstance } from "@/services";

const deleteNotification = async (notificationId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/notifications/${notificationId}`,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch delete notification api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteNotification;
