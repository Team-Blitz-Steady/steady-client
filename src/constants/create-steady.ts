export const STEADY_RECRUITMENT_EXAMPLE =
  "[모집 내용 예시]\n" +
  "∙ 주제 : 프론트엔드 스터디\n" +
  "∙ 목표 : 프론트엔드 기초 공부\n" +
  "∙ 예상 일정(횟수) : 2주(2회)\n" +
  "∙ 예상 커리큘럼 간략히 : HTML, CSS, JavaScript\n" +
  "∙ 예상 모집인원 : 4명\n" +
  "∙ 소개와 개설 이유 : 프론트엔드에 입문하고 싶은 사람끼리 모여서 함께 공부하고 싶어서 개설했습니다.\n" +
  "∙ 주의사항 : 2주에 2회 이상 참여하지 못하면 강퇴됩니다.\n" +
  "∙ 연락할 수 있는 방법을 남겨주세요. (이메일, 카카오 오픈채팅방 등...) : 카카오톡 오픈채팅방 링크\n";

export const STEADY_SECTION_INTRO = "📖 스테디 정보를 입력해주세요.";

export const RECRUITMENT_SECTION_INTRO = "✍️ 모집글 정보를 입력해주세요.";

export const STEADY_RESPONSE_MOCK_DATA = {
  id: 1,
  nickname: "닉네임",
  profileImage: "https://avatars.githubusercontent.com/u/69716992?v=4",
  title: "어썸한 스터디",
  introduction: "어썸한 스터디입니다.",
  type: { value: "study", label: "스터디" },
  status: { value: "recruiting", label: "모집중" },
  method: { value: "online", label: "온라인" },
  deadline: new Date("2023-12-10"),
  createdAt: new Date("2023-12-02"),
  expectedPeriod: { value: "TWO_MONTH", label: "2개월" },
  participantLimit: "5",
  recruitCategory: [{ value: "frontend", label: "프론트엔드" }],
  stacks: [
    { value: "react", label: "React" },
    { value: "nextjs", label: "Next.js" },
  ],
  recruitTitle: "프론트엔드 스터디 모집합니다.",
  recruitTags: ["#프론트엔드", "#스터디", "#초보"], // 필요
  recruitContent:
    "∙ 주제 : 프론트엔드 스터디\n" +
    "∙ 목표 : 프론트엔드 기초 공부\n" +
    "∙ 예상 일정(횟수) : 2주(2회)\n" +
    "∙ 예상 커리큘럼 간략히 : HTML, CSS, JavaScript\n" +
    "∙ 예상 모집인원 : 4명\n" +
    "∙ 소개와 개설 이유 : 프론트엔드에 입문하고 싶은 사람끼리 모여서 함께 공부하고 싶어서 개설했습니다.\n" +
    "∙ 주의사항 : 2주에 2회 이상 참여하지 못하면 강퇴됩니다.\n" +
    "∙ 연락할 수 있는 방법을 남겨주세요. (이메일, 카카오 오픈채팅방 등...) : 카카오톡 오픈채팅방 링크\n",
};

export const steadyCategories = [
  { value: "study", label: "스터디" },
  { value: "project", label: "프로젝트" },
];

export const steadyParticipantsLimit = [
  { value: "2", label: "2명" },
  { value: "3", label: "3명" },
  { value: "4", label: "4명" },
  { value: "5", label: "5명" },
  { value: "6", label: "6명" },
  { value: "7", label: "7명" },
  { value: "8", label: "8명" },
  { value: "9", label: "9명" },
  { value: "10", label: "10명" },
];

export const steadyRecruitmentFields = [
  { value: "frontend", label: "프론트엔드" },
  { value: "backend", label: "백엔드" },
  { value: "design", label: "디자인" },
  { value: "planning", label: "기획" },
  { value: "marketing", label: "마케팅" },
  { value: "etc", label: "기타" },
];

export const steadyRunningMethods = [
  { value: "offline", label: "오프라인" },
  { value: "online", label: "온라인" },
];

export const steadyExpectedPeriods = [
  { value: "TO_BE_DETERMINED", label: "미정" },
  { value: "ONE_WEEK", label: "1주" },
  { value: "TWO_WEEK", label: "2주" },
  { value: "THREE_WEEK", label: "3주" },
  { value: "FOUR_WEEK", label: "4주" },
  { value: "FIVE_WEEK", label: "5주" },
  { value: "TWO_MONTH", label: "2개월" },
  { value: "THREE_MONTH", label: "3개월" },
  { value: "FOUR_MONTH", label: "4개월" },
  { value: "FIVE_MONTH", label: "5개월" },
  { value: "SIX_MONTH", label: "6개월" },
  { value: "LONG_TERM", label: "장기" },
];

export const steadyExpectedParticipants = [
  { value: "1", label: "1명" },
  { value: "2", label: "2명" },
  { value: "3", label: "3명" },
  { value: "4", label: "4명" },
  { value: "5", label: "5명" },
  { value: "6", label: "6명" },
  { value: "7", label: "7명" },
  { value: "8", label: "8명" },
  { value: "9", label: "9명" },
  { value: "10", label: "10명" },
];

export const steadyExpectedTechStacks = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "vue", label: "Vue" },
  { value: "nuxtjs", label: "Nuxt.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "express", label: "Express" },
  { value: "nestjs", label: "Nest.js" },
  { value: "django", label: "Django" },
  { value: "flask", label: "Flask" },
  { value: "spring", label: "Spring" },
  { value: "mybatis", label: "MyBatis" },
  { value: "jpa", label: "JPA" },
  { value: "hibernate", label: "Hibernate" },
  { value: "mysql", label: "MySQL" },
  { value: "mariadb", label: "MariaDB" },
];

export const steadyRecruitmentStatus = [
  { value: "recruiting", label: "모집중" },
  { value: "recruited", label: "모집 마감" },
];
