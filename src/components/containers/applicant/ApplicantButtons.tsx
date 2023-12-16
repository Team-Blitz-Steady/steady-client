import Button, { buttonSize } from "@/components/_common/Button";
import { AlertModal } from "@/components/_common/Modal";
import { useManageApplicant } from "./hooks/useManageApplicant";

const ApplicantButtons = ({
  applicationId,
  steadyId,
}: {
  applicationId: string;
  steadyId: string;
}) => {
  const { handleClickAccept, handleClickReject } = useManageApplicant({
    applicationId,
    steadyId,
  });

  return (
    <>
      <AlertModal
        trigger={
          <Button className={`${buttonSize.sm} bg-st-red text-st-white`}>
            거절
          </Button>
        }
        actionButton={
          <Button
            className={`${buttonSize.sm} bg-st-red text-st-white`}
            onClick={handleClickReject}
          >
            거절
          </Button>
        }
      >
        <div className="text-18 font-bold">거절 하시겠습니까?</div>
      </AlertModal>
      <AlertModal
        trigger={
          <Button className={`${buttonSize.sm} bg-st-green text-st-white`}>
            승인
          </Button>
        }
        actionButton={
          <Button
            className={`${buttonSize.sm} bg-st-green text-st-white`}
            onClick={handleClickAccept}
          >
            승인
          </Button>
        }
      >
        <div className="text-18 font-bold">승인 하시겠습니까?</div>
      </AlertModal>
    </>
  );
};

export default ApplicantButtons;
