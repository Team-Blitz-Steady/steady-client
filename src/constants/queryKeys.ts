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
export const getSteadiesKey = ["steadies"];

export const getSteadyDetailsKey = (steadyId: string | number) => [
  "steadyDetails",
  steadyId,
];

export const getSteadyQuestionsKey = (steadyId: string) => [
  "steadyQuestionsSubmit",
  steadyId,
];

export const getSteadyParticipantsKey = (steadyId: string) => [
  "steadyParticipants",
  steadyId,
];

// Position

export const getPositionsKey = ["positions"];

// Stack

export const getStacksKey = ["stacks"];
