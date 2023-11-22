import { axiosInstance, isAbnormalCode } from "..";

const deleteSteady = async (steadyId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/steadies/${steadyId}`);
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch steady delete api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteSteady;
