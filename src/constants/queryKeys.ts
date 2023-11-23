// Application
export const getApplicationDetailsKey = (applicationId: string) => [
  "applicationDetails",
  applicationId,
];

export const getApplicantListKey = (steadyId: string) => [
  "applicantList",
  steadyId,
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

// Position

export const getPositionsKey = ["positions"];

// Stack

export const getStacksKey = ["stacks"];
