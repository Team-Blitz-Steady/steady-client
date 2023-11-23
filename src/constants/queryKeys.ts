// Application
export const getApplicationDetailsKey = (applicationId: string) => [
  "applicationDetails",
  applicationId,
];

// Steady
export const getSteadyDetailsKey = (steadyId: string) => [
  "steadyDetails",
  steadyId,
];

export const getSteadyQuestionsKey = (steadyId: string) => [
  "steadyQuestionsSubmit",
  steadyId,
];
