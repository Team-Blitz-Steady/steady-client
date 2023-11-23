// Application
export const getApplicationDetailsKey = (applicationId: string) => [
  "applicationDetails",
  applicationId,
];

export const getApplicationListKey = ["myApplication"];

export const getApplicantListKey = (steadyId: string) => [
  "applicantList",
  steadyId,
];

// Steady
export const getSteadiesKey = ["steadies"];

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
export const getTemplatesKey = ["templates"];

export const getTemplateDetailsKey = (templateId: string) => [
  "templateDetails",
  templateId,
];

// Position
export const getPositionsKey = ["positions"];

// Stack
export const getStacksKey = ["stacks"];

// Review
export const getMyReviewKey = ["myreview"];
