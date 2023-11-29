export interface KakaoTokenType {
  id: number;
  isNew: boolean;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

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
  viewCount: number;
  stacks: Stack[];
  likeCount: number;
}

interface Stack {
  id: number;
  name: string;
  imageUrl: string;
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

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
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
  viewCount: number;
  positions: PositionType[];
  stacks: StackType[];
  isLeader: boolean;
  applicationId: number;
  promotionCount: number;
  createdAt: string;
  finishedAt: string;
  isReviewEnabled: boolean;
  contact: string;
  isLiked: boolean;
}

export interface TemplateType {
  templates: Template[];
}

interface Template {
  id: number;
  title: string;
  createdAt: string;
}

export interface TemplateDetailType {
  id: number;
  title: string;
  questions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateType {
  title: string;
  questions: string[];
}

export interface CreateSteadyRequestBodyType {
  name: string;
  bio: string;
  type: string;
  participantLimit: number;
  steadyMode: string;
  scheduledPeriod: string;
  deadline: string;
  title: string;
  content: string;
  positions: number[];
  stacks: number[];
  questions: string[];
}

export interface ApplicationSurveyType {
  question: string;
  answer: string;
}

export interface ApplicationDetailsType {
  surveys: ApplicationSurveyType[];
}

export interface ApplicantType {
  applicationId: number;
  userId: number;
  nickname: string;
  profileImage: string;
}
export interface ApplicantListType {
  content: ApplicantType[];
  numberOfElements: number;
  hasNext: boolean;
}

export interface UserProfileType {
  accountId: number;
  nickname: string;
  positionId: number;
  stacksId: number[];
}

export interface CheckSameUsernameType {
  exist: boolean;
}

export interface ApplicationStatusType {
  status: "ACCEPTED" | "WAITING" | "REJECTED";
}

export interface SteadyParticipantsUserType {
  id: number;
  nickname: string;
  profileImage: string;
  isLeader: boolean;
}

export interface SteadyParticipantsType {
  participants: SteadyParticipantsUserType[];
}

export interface StackResponse {
  stacks: StackType[];
}

export interface PositionResponse {
  positions: PositionType[];
}

export interface MySteadyContentType {
  steadyId: number;
  name: string;
  contact: string;
  isLeader: boolean;
  joinedAt: string;
}

export interface MySteadyType {
  content: MySteadyContentType[];
  numberOfElements: number;
  hasNext: boolean;
}

export interface SteadyQuestionsType {
  steadyName: string;
  steadyQuestions: [
    {
      id: number;
      content: string;
      sequence: number;
    },
  ];
}

export interface MyProfileType {
  platform: string;
  userId: number;
  profileImage: string;
  nickname: string;
  bio: string;
  position: PositionType;
  stacks: StackType[];
}

export interface UserCardType {
  cardId: number;
  imageUrl: string;
  count: number;
}
export interface UsersProfileType {
  user: {
    userId: number;
    profileImage: string;
    nickname: string;
    bio: string;
    position: PositionType;
    stacks: StackType[];
  };
  userCards: UserCardType[];
  reviews: string[];
  isDeleted: boolean;
}

export interface UpdateMyProfileType {
  profileImage: string;
  nickname: string;
  bio: string;
  positionId: number;
  stacksId: number[];
}

export interface Notification {
  id: number;
  type: "FRESH_APPLICATION" | "APPLICATION_RESULT";
  content: string;
  redirectUri: string;
  isRead: boolean;
}
export interface AllNotificationsType {
  notifications: Notification[];
  freshCount: number;
}

export interface ReviewType {
  reviewId: number;
  comment: string;
  isPublic: boolean;
  createdAt: string;
}

export interface SteadyReviewType {
  steadyId: number;
  steadyName: string;
  reviews: ReviewType[];
}

export interface MyReviewsType {
  userCards: UserCardType[];
  reviews: SteadyReviewType[];
}

export interface ReviewStatusType {
  isPublic: boolean;
}

export interface CreateReviewType {
  revieweeId: number;
  cardsId: number[];
  comment: string;
}

export interface LikeSteadyType {
  likeCount: number;
  isLike: boolean;
}

export interface ApplicationList {
  content: Application[];
  numberOfElements: number;
  hasNext: boolean;
}

interface Application {
  steadyId: number;
  applicationId: number;
  steadyName: string;
  createdAt: string;
  status: string;
}

export interface EditApplicationType {
  answers: string[];
}

export interface ReviewSteadyInfoType {
  steady: ReviewSteadyType;
  reviewees: RevieweeType[];
}

interface ReviewSteadyType {
  steadyId: number;
  name: string;
  steadyMode: string;
  steadyType: string;
  participants: number;
  participatedAt: string;
  finishedAt: string;
  reviewDeadline: string;
}

interface RevieweeType {
  userId: number;
  nickname: string;
  profileImage: string;
}

export interface ReviewCardsType {
  cards: ReviewCard[];
}

interface ReviewCard {
  cardId: number;
  content: string;
  imageUrl: string;
}

export interface ImageUrlResponse {
  presignedUrl: string;
  objectUrl: string;
}

export interface ErrorResponse {
  message: string;
  code: string;
}
