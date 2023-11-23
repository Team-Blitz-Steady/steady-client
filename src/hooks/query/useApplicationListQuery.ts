import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import getApplicationList from "@/services/application/getApplicationList";
import { ApplicationListKey } from "@/constants/queryKeys";

const useApplicationListQuery = () => {
  const {
    data: applicationListData,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useSuspenseInfiniteQuery({
    queryKey: ApplicationListKey,
    queryFn: ({ pageParam }) => getApplicationList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.hasNext) {
        return pages.length;
      } else {
        return undefined;
      }
    },
  });
  return { applicationListData, hasNextPage, fetchNextPage, refetch };
};

export default useApplicationListQuery;
