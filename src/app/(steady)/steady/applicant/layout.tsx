import { Separator } from "@radix-ui/themes";
import Button, { buttonSize } from "@/components/_common/Button";
import { AlertModal } from "@/components/_common/Modal";
import SideBar from "@/components/_common/SideBar";

const applicants = [
  {
    id: "1",
    label: "신청자1",
    href: "/applicant/1",
  },
  {
    id: "2",
    label: "신청자2",
    href: "/applicant/2",
  },
  {
    id: "3",
    label: "신청자3",
    href: "/applicant/3",
  },
  {
    id: "4",
    label: "신청자1",
    href: "/applicant/4",
  },
  {
    id: "1",
    label: "신청자1",
    href: "/applicant/1",
  },
  {
    id: "2",
    label: "신청자2",
    href: "/applicant/2",
  },
  {
    id: "3",
    label: "신청자3",
    href: "/applicant/3",
  },
  {
    id: "4",
    label: "신청자1",
    href: "/applicant/4",
  },
  {
    id: "1",
    label: "신청자1",
    href: "/applicant/1",
  },
  {
    id: "2",
    label: "신청자2",
    href: "/applicant/2",
  },
  {
    id: "3",
    label: "신청자3",
    href: "/applicant/3",
  },
  {
    id: "4",
    label: "신청자1",
    href: "/applicant/4",
  },
];

const ApplicantLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col gap-30">
      <div className="text-30 font-bold">신청자 목록</div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
      <div className="flex w-full flex-row gap-30">
        <div className="w-fit">
          <SideBar
            listType="applicant"
            sidebarItems={applicants}
            className="scrollbar-hide"
          />
        </div>
        {children}
      </div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
      <div className="flex justify-end gap-10">
        <AlertModal
          trigger={
            <Button className={`${buttonSize.sm} bg-st-red text-st-white`}>
              거절
            </Button>
          }
          actionButton={
            <Button className={`${buttonSize.sm} bg-st-red text-st-white`}>
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
            <Button className={`${buttonSize.sm} bg-st-green text-st-white`}>
              승인
            </Button>
          }
        >
          <div className="text-18 font-bold">승인 하시겠습니까?</div>
        </AlertModal>
      </div>
    </div>
  );
};

export default ApplicantLayout;
