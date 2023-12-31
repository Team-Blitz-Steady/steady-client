import { axiosInstance, isAbnormalCode } from "@/services";
import type { AxiosResponse } from "axios";
import type { SteadyQuestionsType } from "@/services/types";

const getSteadyQuestions = async (steadyId: string) => {
  try {
    const response: AxiosResponse<SteadyQuestionsType> =
      await axiosInstance.get<SteadyQuestionsType>(
        `/api/v1/steadies/${steadyId}/questions`,
      );

    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch steady questions!");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getSteadyQuestions;
