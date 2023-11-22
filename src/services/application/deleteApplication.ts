import { axiosInstance } from "..";

const deleteApplication = async (applicationId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/applications/${applicationId}`,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch delete application api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteApplication;
