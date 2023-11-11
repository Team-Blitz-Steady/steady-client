import { axiosInstance } from "..";

const promoteSteady = async (steadyId: string) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/steadies/${steadyId}/promote`,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch promote steady api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default promoteSteady;
