import { axiosInstance } from "..";

const deleteSteady = async (steadyId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/steadies/${steadyId}`);
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch steady delete url!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteSteady;
