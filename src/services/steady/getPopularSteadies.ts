import { axiosInstance, isAbnormalCode } from "@/services";

interface GetPopularSteadiesOptions {
  date: string;
  limit: string;
  type: "STUDY" | "PROJECT" | "ALL";
}

export interface GetPopularSteadiesResponse {
  steadyId: number;
  title: string;
  type: "STUDY" | "PROJECT" | "ALL";
  status: "RECRUITING" | "CLOSED" | "FINISHED";
  deadline: string;
  viewCount: number;
  likeCount: number;
}

const getPopularSteadies = async ({
  date,
  limit,
  type,
}: GetPopularSteadiesOptions) => {
  try {
    const response = await axiosInstance.get<GetPopularSteadiesResponse[]>(
      "/api/v1/steadies/rank?date=" +
        date +
        "&limit=" +
        limit +
        "&type=" +
        type,
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch search steadies api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getPopularSteadies;
