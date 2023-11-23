import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import getApplicantList from "@/services/application/getApplicantList";
import { getApplicantListKey } from "@/constants/queryKeys";

const useApplicantListQuery = ({ steadyId }: { steadyId: string }) => {
  const {
    data: applicantListData,
    hasNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: getApplicantListKey(steadyId),
    queryFn: ({ pageParam }) => getApplicantList(steadyId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.hasNext) {
        return pages.length;
      } else {
        return undefined;
      }
    },
  });
  return { applicantListData, hasNextPage, fetchNextPage };
};

export default useApplicantListQuery;
