import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSuspenseQuery } from "@tanstack/react-query";
import editApplication from "@/services/application/editApplication";
import getApplicationDetails from "@/services/application/getApplicationDetails";
import Button, { buttonSize } from "@/components/_common/Button";
import { getApplicationDetailsKey } from "@/constants/queryKeys";

interface EditButtonsProps {
  survey: {
    question: string;
    answer: string;
  }[];
  applicationId: string;
  steadyId: string;
}

const EditButtons = ({ survey, applicationId, steadyId }: EditButtonsProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { refetch: applicationRefetch } = useSuspenseQuery({
    queryKey: getApplicationDetailsKey(applicationId),
    queryFn: () => getApplicationDetails(applicationId),
  });

  const handleClickEdit = async () => {
    const checkInvalidAnswers = survey.some((item) => !item.answer.length);
    if (checkInvalidAnswers) {
      toast({
        description: "입력되지 않은 항목이 있습니다.",
        variant: "red",
      });
    } else {
      try {
        await editApplication(applicationId, {
          answers: survey.map((item) => item.answer),
        });
        toast({
          description: "스테디 신청서 수정 성공!",
          variant: "green",
        });
        await applicationRefetch();
        router.replace(`/steady/detail/${steadyId}`);
      } catch (error) {
        toast({
          description: "스테디 신청서 수정 실패!",
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
        onClick={handleClickEdit}
        className={`${buttonSize.sm} bg-st-primary text-st-white`}
      >
        수정 완료
      </Button>
    </>
  );
};

export default EditButtons;
