import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSuspenseQuery } from "@tanstack/react-query";
import submitApplication from "@/services/application/submitApplication";
import getSteadyDetails from "@/services/steady/getSteadyDetails";
import Button, { buttonSize } from "@/components/_common/Button";
import { getSteadyDetailsKey } from "@/constants/queryKeys";

interface SubmitButtonsProps {
  applicationData: {
    question: string;
    answer: string;
  }[];
  steadyId: string;
}

const SubmitButtons = ({ applicationData, steadyId }: SubmitButtonsProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { refetch: steadyDetailsRefetch } = useSuspenseQuery({
    queryKey: getSteadyDetailsKey(steadyId),
    queryFn: () => getSteadyDetails(steadyId),
    staleTime: 10000,
  });

  const onSubmitAnswers = async () => {
    const checkInvalidAnswers = applicationData.some(
      (item) => !item.answer.length,
    );
    if (checkInvalidAnswers) {
      toast({
        description: "입력되지 않은 항목이 있습니다.",
        variant: "red",
      });
    } else {
      try {
        await submitApplication(steadyId, applicationData);
        toast({
          description: "스테디 참여 신청서 제출 성공!",
          variant: "green",
        });
        steadyDetailsRefetch();
      } catch (error) {
        toast({
          description: "스테디 참여 신청서 제출 실패!",
          variant: "red",
        });
      }
    }
  };

  return (
    <>
      <Button
        className={`${buttonSize.sm} bg-st-white`}
        onClick={() => router.back()}
      >
        취소
      </Button>
      <Button
        onClick={onSubmitAnswers}
        className={`${buttonSize.sm} bg-st-primary text-st-white`}
      >
        제출 완료
      </Button>
    </>
  );
};

export default SubmitButtons;
