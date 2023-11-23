import { axiosInstance, isAbnormalCode } from "@/services";
import type { AxiosResponse } from "axios";
import type { AllNotificationsType } from "../types";

const getAllNotifications = async () => {
  try {
    const response: AxiosResponse<AllNotificationsType> =
      await axiosInstance.get("/api/v1/notifications");
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch all notifications api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllNotifications;
