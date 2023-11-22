import { axiosInstance } from "..";
import type { EditApplicationType } from "../types";

const editApplication = async (
  applicationId: string,
  payload: EditApplicationType,
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/applications/${applicationId}`,
      payload,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch edit application api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default editApplication;
