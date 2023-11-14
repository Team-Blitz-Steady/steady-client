import axios from "axios";
import type { StackResponse } from "@/services/types";

const getStacks = async () => {
  // TODO: Axios 인터셉터 오류 해결 시 대체
  try {
    const response = await axios.get<StackResponse>(
      "https://dev.steadies.kr/api/v1/stacks",
    );
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
