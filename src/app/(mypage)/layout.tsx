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
        boxStyles="w-[300px] h-[814px] border-solid border-5 rounded-[20px] gap-y-[30px] border-2 py-[47px]"
        itemStyles="w-[250px] h-[65px] rounded-[5px] text-[18px] font-bold p-[20px]"
      />
      {children}
    </div>
  );
};

export default MyPageLayout;
