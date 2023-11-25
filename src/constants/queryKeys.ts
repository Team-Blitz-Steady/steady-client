// Application
export const getApplicationDetailsKey = (applicationId: string) => [
  "applicationDetails",
  applicationId,
];

export const ApplicationListKey = ["myApplication"];

export const getApplicantListKey = (steadyId: string) => [
  "applicantList",
  steadyId,
];

// Steady
export const SteadiesKey = ["steadies"];

export const getSteadyDetailsKey = (steadyId: string | number) => [
  "steadyDetails",
  steadyId,
];

export const getSteadyQuestionsKey = (steadyId: string) => [
  "steadyQuestionsSubmit",
  steadyId,
];

export const getSteadyEditQuestionsKey = (steadyId: string) => [
  "questions",
  steadyId,
];

export const getSteadyParticipantsKey = (steadyId: string) => [
  "steadyParticipants",
  steadyId,
];

export const getMySteadyKey = (status?: string, direction?: string) => [
  "mysteady",
  status,
  direction,
];

// Template
export const TemplatesKey = ["templates"];

export const getTemplateDetailsKey = (templateId: string) => [
  "templateDetails",
  templateId,
];

// Position
export const PositionsKey = ["positions"];

// Stack
export const StacksKey = ["stacks"];

// Review
export const MyReviewKey = ["myreview"];


// User
export const getUserProfileKey = (userId: number) => ["userProfile", userId];

// Notification
export const NotificationKey = ["notifications"];
