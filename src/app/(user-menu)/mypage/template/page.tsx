import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";

const MyTemplatePage = () => {
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
    <div className="flex gap-30">
      <div>
        <div className="flex justify-between p-20 text-30 font-bold">
          내 신청서 양식
          <Button className={`${buttonSize.lg} bg-st-primary text-st-white`}>
            신청서 생성
          </Button>
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="h-750 w-750">
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
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
      </div>
    </div>
  );
};

export default MyTemplatePage;
