import SideBar from "@/components/_common/SideBar";

const myPageList = [
  {
    label: "내 프로필",
    href: "/mypage",
  },
  {
    label: "내 신청서",
    href: "/mypage/form",
  },
  {
    label: "내가 받은 리뷰",
    href: "/mypage/reviews",
  },
];

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-grow gap-50">
      <SideBar
        sidebarItems={myPageList}
        listType="mypage"
      />
      {children}
    </div>
  );
};

export default MyPageLayout;
