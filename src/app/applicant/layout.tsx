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
        boxStyles="w-233 h-950 gap-y-24 border-2 py-27"
        itemStyles="flex items-center w-195 h-58 rounded-5 p-20"
      />
      {children}
    </div>
  );
};

export default ApplicantLayout;
