export const emptySteadiesMessage = (search: string) => {
  switch (search) {
    case "finished":
      return "종료된 ";
    case "recruiting" || "closed":
      return "참여중인 ";
    default:
      return "참여중이거나 종료된 ";
  }
};
