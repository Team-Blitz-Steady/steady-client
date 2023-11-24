import { useMutation, useQueryClient } from "@tanstack/react-query";
import likeSteady from "@/services/steady/likeSteady";
import type { SteadyDetailsType } from "@/services/types";
import { getSteadyDetailsKey } from "@/constants/queryKeys";

export const useLikeSteadyMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likeSteady,
    // mutate를 호출할 때 넘겨주는 steadyId를 받아옴
    // onMutate -> onSuccess -> onError
    onMutate: async (steadyId) => {
      await queryClient.cancelQueries({
        queryKey: getSteadyDetailsKey(steadyId),
      });
      const previousData = queryClient.getQueryData<SteadyDetailsType>(
        getSteadyDetailsKey(steadyId),
      );
      queryClient.setQueryData<SteadyDetailsType>(
        getSteadyDetailsKey(steadyId),
        (old) => old && { ...old, isLiked: !old.isLiked },
      );
      return previousData;
    },
    onError: (error, steadyId, context) => {
      queryClient.setQueryData<SteadyDetailsType>(
        getSteadyDetailsKey(steadyId),
        context,
      );
    },
  });
};
