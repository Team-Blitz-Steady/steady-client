import type { StackResponse } from "@/services/types";
import { axiosInstance } from "..";

const getStacks = async () => {
  try {
    const response = await axiosInstance.get<StackResponse>("/api/v1/stacks");
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch stacks api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getStacks;
