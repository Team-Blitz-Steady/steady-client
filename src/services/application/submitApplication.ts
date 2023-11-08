import type { AxiosResponse } from "axios";
import { axiosInstance } from "..";
import type { SurveyType } from "./../types/index";

const submitApplication = async (
  steadyId: string,
  applicationData: SurveyType[],
) => {
  try {
    const response: AxiosResponse<string> = await axiosInstance.post(
      `/api/v1/steadies/${steadyId}/applications`,
      applicationData,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch submit application api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default submitApplication;
