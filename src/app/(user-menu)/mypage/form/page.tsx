import Button, { buttonSize } from "@/components/_common/Button";
import SideBar from "@/components/_common/SideBar";

const MyFormPage = () => {
  const myPageItems = [
    {
      label: "내 프로필",
      href: "/mypage",
      id: "1",
    },
    {
      label: "내 신청서",
      href: "/myform",
      id: "2",
    },
    {
      label: "내가 받은 리뷰",
      href: "/myreviews",
      id: "3",
    },
  ];

  return (
    <div className="mt-50 flex gap-30">
      <SideBar
        sidebarItems={myPageItems}
        boxStyles="w-300 h-814 border-solid border-1 rounded-20 gap-y-30 border-2 py-47"
        itemStyles="w-250 h-65 rounded-5 text-18 font-bold p-20"
      />
      <div>
        <div className="flex justify-between p-20 text-30 font-bold">
          내 신청서 양식
          <Button className={`${buttonSize.lg} bg-st-primary text-st-white`}>
            신청서 생성
          </Button>
        </div>
        <div>
          <div className="h-5 w-750 bg-st-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default MyFormPage;
