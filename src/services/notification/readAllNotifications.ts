import { axiosInstance } from "@/services";

const readAllNotifications = async () => {
  try {
    const response = await axiosInstance.patch("/api/v1/notifications/readAll");
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch read all notification api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default readAllNotifications;
