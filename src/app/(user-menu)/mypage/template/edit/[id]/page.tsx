"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import getTemplateDetail from "@/services/template/getTemplateDetail";
import Button, { buttonSize } from "@/components/_common/Button";

// import Icon from "@/components/_common/Icon";

const EditTemplatePage = () => {
  const pathname = usePathname();
  const templateId = pathname.split("/")[4];

  const { data } = useQuery({
    queryKey: ["template_detail"],
    queryFn: () => getTemplateDetail(templateId),
  });

  return (
    <div className="flex gap-30">
      <div>
        <div className="flex justify-between p-20 text-30 font-bold">
          템플릿 상세보기
          <Button
            className={`${buttonSize.lg} bg-st-primary text-st-white`}
            // onClick={addQuestion}
          >
            수정하기
          </Button>
          {/* <Button
            className={`${buttonSize.lg} bg-st-primary text-st-white`}
            onClick={addQuestion}
          >
            질문 추가
          </Button> */}
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="h-750 w-750 overflow-y-scroll">
          <div className="flex flex-col gap-20 p-20">
            {data?.questions.map((item, index) => (
              <div
                key={index}
                className="flex h-70 w-full items-center gap-30 rounded-10 p-10 shadow-lg"
              >
                <div className="h-60 w-10 rounded-full bg-st-skyblue-50"></div>
                <input
                  type="text"
                  placeholder="질문을 입력해 주세요."
                  value={item}
                  // onChange={(e) => updateQuestion(item.id, e.target.value)}
                  className="h-50 w-5/6 text-20 text-st-gray-200 outline-none"
                />
                <div
                  className="cursor-pointer"
                  // onClick={() => removeQuestion(item.id)}
                >
                  {/* <Icon
                    name="cross"
                    size={20}
                    color=""
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="mt-20 flex w-full justify-end">
          {/* <Button className={`${buttonSize.lg} bg-st-primary text-st-white`}>
            수정완료
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default EditTemplatePage;
