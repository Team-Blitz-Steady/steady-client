import { axiosInstance } from "@/services";

const readNotification = async (notificationId: string) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/notifications/${notificationId}`,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch read notification api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default readNotification;
