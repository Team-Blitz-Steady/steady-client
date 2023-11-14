export const transformCreatedAt = (createdAt: string) => {
  const date = createdAt.split("T")[0].replace(/-/g, ".");
  const time = createdAt.split("T")[1].split(":").slice(0, -1).join(":");
  return { date, time };
};
