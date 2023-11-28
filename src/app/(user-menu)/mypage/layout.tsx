import SideBar from "@/components/_common/SideBar";

const myPageList = [
  {
    label: "내 프로필",
    href: "/mypage",
  },
  {
    label: "내 템플릿",
    href: "/mypage/template",
  },
  {
    label: "내 신청서 관리",
    href: "/mypage/application",
  },
  {
    label: "내가 받은 리뷰",
    href: "/mypage/reviews",
  },
];

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-grow gap-50 py-40 max-sm:w-400 sm:w-500 md:w-600 lg:w-800 xl:w-1000">
      <SideBar
        sidebarItems={myPageList}
        listType="mypage"
      />
      {children}
    </div>
  );
};

export default MyPageLayout;
