import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import getApplicationList from "@/services/application/getApplicationList";

const useApplicationListQuery = () => {
  const {
    data: applicationListData,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useSuspenseInfiniteQuery({
    queryKey: ["my-application"],
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
