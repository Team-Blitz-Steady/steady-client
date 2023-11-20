import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import getApplicationsList from "@/services/application/getApplicationsList";

const useApplicantListQuery = ({ steadyId }: { steadyId: string }) => {
  const {
    data: applicantListData,
    hasNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ["applicantList", steadyId],
    queryFn: ({ pageParam }) => getApplicationsList(steadyId, pageParam),
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
