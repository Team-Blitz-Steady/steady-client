import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import getMySteadies from "@/services/steady/getMySteadies";
import { getMySteadyKey } from "@/constants/queryKeys";

interface MySteadyQueryProps {
  status?: string;
  direction?: string;
}

export const useMySteadiesQuery = ({
  status,
  direction,
}: MySteadyQueryProps) => {
  const {
    data: mySteadyData,
    hasNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: getMySteadyKey(status, direction),
    queryFn: ({ pageParam }) =>
      getMySteadies({ status, page: pageParam.toString(), direction }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.hasNext) {
        return pages.length;
      } else {
        return undefined;
      }
    },
  });
  return { mySteadyData, hasNextPage, fetchNextPage };
};
