import MyPageSideBar from "@/components/_common/SideBar";

const applicantItems = [
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
];

const ApplicantLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MyPageSideBar
        sidebarItems={applicantItems}
        boxStyles="w-[233px] h-[950px] gap-y-[24px] border-2 py-[27px]"
        itemStyles="flex items-center w-[195px] h-[58px] rounded-[5px] p-[20px]"
      />
      {children}
    </div>
  );
};

export default ApplicantLayout;
