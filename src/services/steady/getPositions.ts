import axios from "axios";
import type { PositionResponse } from "@/services/types";

const getPositions = async () => {
  // TODO: Axios 인터셉터 오류 해결 시 대체
  try {
    const response = await axios.get<PositionResponse>(
      "https://dev.steadies.kr/api/v1/positions",
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch positions api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getPositions;
