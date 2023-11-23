import type { AxiosResponse } from "axios";
import { axiosInstance, isAbnormalCode } from "..";
import type { ApplicationSurveyType } from "./../types/index";

const submitApplication = async (
  steadyId: string,
  applicationData: ApplicationSurveyType[],
) => {
  try {
    const response: AxiosResponse<string> = await axiosInstance.post(
      `/api/v1/steadies/${steadyId}/applications`,
      applicationData,
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch submit application api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default submitApplication;
