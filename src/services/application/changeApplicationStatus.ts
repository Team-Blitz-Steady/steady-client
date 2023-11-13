import { axiosInstance } from "..";
import type { ApplicationStatusType } from "../types";

const changeApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatusType,
) => {
  try {
    const response = await axiosInstance.patch(
      `/applications/${applicationId}/status`,
      status,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch change application status url!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default changeApplicationStatus;
