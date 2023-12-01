import { format } from "date-fns";

const formattedCreatedAt = (createdAt: string, formatOption: string) => {
  return format(
    new Date(new Date(createdAt).getTime() + 1000 * 60 * 60 * 9),
    formatOption,
  );
};
export default formattedCreatedAt;
