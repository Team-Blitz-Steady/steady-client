import { axiosInstance, isAbnormalCode } from "..";
import type { ApplicationStatusType } from "../types";

const changeApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatusType,
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/applications/${applicationId}/status`,
      status,
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch change application status url!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default changeApplicationStatus;
