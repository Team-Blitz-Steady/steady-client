import { axiosInstance, isAbnormalCode } from "@/services";

const deleteSteadyMember = async (steadyId: string, memberId: string) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/steadies/${steadyId}/${memberId}`,
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch delete steady member api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteSteadyMember;
