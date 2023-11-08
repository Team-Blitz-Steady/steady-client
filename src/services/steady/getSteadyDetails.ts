import { axiosInstance } from "@/services";
import type { AxiosResponse } from "axios";

interface LeaderResponse {
  id: number;
  nickname: string;
  profileImage: string;
}

interface Position {
  id: number;
  name: string;
}

interface Stack {
  id: number;
  name: string;
  imageUrl: string;
}

interface SteadyDetailsType {
  id: number;
  leaderResponse: LeaderResponse;
  name: string;
  bio: string;
  type: "STUDY" | "PROJECT";
  status: "RECRUITING" | "CLOSED" | "FINISHED";
  participantLimit: number;
  numberOfParticipants: number;
  steadyMode: "ONLINE" | "OFFLINE" | "BOTH";
  scheduledPeriod:
    | "TO_BE_DETERMINED"
    | "ONE_WEEK"
    | "TWO_WEEK"
    | "THREE_WEEK"
    | "FOUR_WEEK"
    | "FIVE_WEEK"
    | "TWO_MONTH"
    | "THREE_MONTH"
    | "FOUR_MONTH"
    | "FIVE_MONTH"
    | "SIX_MONTH"
    | "LONG_TERM";
  deadline: string;
  title: string;
  content: string;
  positions: Position[];
  stacks: Stack[];
  isLeader: boolean;
  isSubmittedUser: boolean;
  promotionCount: number;
}

const getSteadyDetails = async (steadyId: number) => {
  try {
    const response: AxiosResponse<SteadyDetailsType> = await axiosInstance.get(
      `/api/v1/steadies/${steadyId}`,
    );
    if (Math.floor(response.status / 10) !== 20) {
      throw new Error("Failed to fetch steady detail url!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error;
  }
};

export default getSteadyDetails;
