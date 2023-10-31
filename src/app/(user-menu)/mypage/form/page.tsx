import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
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

  const myFormItems = [
    {
      title: "넥터디 양식",
      createdAt: "2023.09.27",
      id: "1",
    },
    {
      title: "넥터디 양식",
      createdAt: "2023.09.27",
      id: "2",
    },
    {
      title: "넥터디 양식",
      createdAt: "2023.09.27",
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
        <div className="w-750">
          <div className="h-5 w-full bg-st-gray-200"></div>
          {myFormItems.map((form, id) => (
            <div
              key={id}
              className="group flex items-center justify-between p-50 transition hover:scale-105 hover:bg-st-gray-50"
            >
              <div className="text-25 font-bold">{form.title}</div>
              <div className="group flex">
                <div className="transform text-15 font-bold text-st-gray-100 transition group-hover:-translate-x-[30px]">
                  생성일 {form.createdAt}
                </div>
                <div className="hidden gap-20 transition duration-500 group-hover:flex">
                  <Icon
                    name="pencil"
                    size={20}
                    color="text-st-gray-100"
                  />
                  <Icon
                    name="trash"
                    size={20}
                    color="text-st-gray-100"
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="h-5 w-full bg-st-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default MyFormPage;
