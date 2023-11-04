import { Separator } from "@radix-ui/themes";
import SideBar from "@/components/_common/SideBar";

const applicants = [
  {
    id: "1",
    label: "신청자1",
    href: "/applicants/1",
  },
  {
    id: "2",
    label: "신청자2",
    href: "/applicants/2",
  },
  {
    id: "3",
    label: "신청자3",
    href: "/applicants/3",
  },
  {
    id: "4",
    label: "신청자1",
    href: "/applicants/1",
  },
];

const ApplicantLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-30">
      <div className="text-30 font-bold">신청자 목록</div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
      <div className="flex w-full flex-row gap-30">
        <SideBar
          listType="applicant"
          sidebarItems={applicants}
        />
        {children}
      </div>
      <Separator className="h-5 w-auto bg-st-gray-400" />
    </div>
  );
};

export default ApplicantLayout;
