export interface KakaoTokenType {
  id: number;
  isNew: boolean;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface LeaderResponseType {
  id: number;
  nickname: string;
  profileImage: string;
}

export interface PositionType {
  id: number;
  name: string;
}

export interface StackType {
  id: number;
  name: string;
  imageUrl: string;
}

export interface SteadyDetailsType {
  id: number;
  leaderResponse: LeaderResponseType;
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
  positions: PositionType[];
  stacks: StackType[];
  isLeader: boolean;
  isSubmittedUser: boolean;
  promotionCount: number;
}

export interface TemplateType {
  templates: Template[];
}

interface Template {
  id: number;
  title: string;
  createdAt: string;
}
