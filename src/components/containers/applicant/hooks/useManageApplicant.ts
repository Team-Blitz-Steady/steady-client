import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import changeApplicationStatus from "@/services/application/changeApplicationStatus";
import { getApplicantListKey } from "@/constants/queryKeys";

interface ManageApplicantProps {
  applicationId: string;
  steadyId: string;
}

export const useManageApplicant = ({
  applicationId,
  steadyId,
}: ManageApplicantProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleClickAccept = async () => {
    await changeApplicationStatus(applicationId, {
      status: "ACCEPTED",
    });
    await queryClient.invalidateQueries({
      queryKey: getApplicantListKey(steadyId),
    });
    router.replace(`/steady/applicant/${steadyId}`);
  };

  const handleClickReject = async () => {
    await changeApplicationStatus(applicationId, {
      status: "REJECTED",
    });
    await queryClient.invalidateQueries({
      queryKey: getApplicantListKey(steadyId),
    });
    router.replace(`/steady/applicant/${steadyId}`);
  };

  return { handleClickAccept, handleClickReject };
};
