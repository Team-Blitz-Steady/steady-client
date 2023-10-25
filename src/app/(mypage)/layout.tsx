import MyPageSideBar from "@/components/_common/SideBar";

const myPageItems = [
  {
    label: "내 프로필",
    href: "/mypage",
  },
  {
    label: "내 신청서",
    href: "/myform",
  },
  {
    label: "내가 받은 리뷰",
    href: "/myreviews",
  },
];

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MyPageSideBar
        sidebarItems={myPageItems}
        boxStyles="w-300 h-814 border-solid border-5 rounded-20 gap-y-30 border-2 py-47"
        itemStyles="w-250 h-65 rounded-5 text-18 font-bold p-20"
      />
      {children}
    </div>
  );
};

export default MyPageLayout;
