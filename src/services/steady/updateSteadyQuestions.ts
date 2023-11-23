import { axiosInstance, isAbnormalCode } from "@/services";

const updateSteadyQuestions = async (steadyId: string, questions: string[]) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/steadies/${steadyId}/questions`,
      {
        questions: questions,
      },
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to update steady questions!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default updateSteadyQuestions;
