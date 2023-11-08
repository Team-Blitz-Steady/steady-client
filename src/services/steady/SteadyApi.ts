import { baseInstance } from "@/services";

export interface Steadies {
  content: Content[];
  numberOfElements: number;
  page: number;
  size: number;
  sort: Sort;
  totalPages: number;
  totalElements: number;
}

interface Content {
  id: number;
  nickname: string;
  profileImage: string;
  title: string;
  type: string;
  status: string;
  deadline: string;
  createdAt: string;
  participantLimit: number;
  numberOfParticipants: number;
  stacks: Stacks[];
}

interface Stacks {
  id: number;
  name: string;
  imageUrl: string;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export const SteadiesApi = {
  GET_STEADIES: async (): Promise<Steadies[]> => {
    const response = await baseInstance.get("/api/v1/steadies");
    return response.data;
  },
};
