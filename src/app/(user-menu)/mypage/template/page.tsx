"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import deleteTemplate from "@/services/template/deleteTemplate";
import getTemplates from "@/services/template/getTemplates";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";

const MyTemplatePage = () => {
  const { data, refetch } = useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });
  const router = useRouter();

  const handleDeleteTemplate = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    const data = await deleteTemplate(id);
    if (!data) {
      refetch();
    }
  };

  const handleTemplateDetail = (id: number) => {
    router.push(`/mypage/template/edit/${id}`);
  };

  return (
    <div className="flex gap-30">
      <div>
        <div className="flex justify-between p-20 text-30 font-bold">
          내 템플릿
          <Link href={"/mypage/template/create"}>
            <Button className={`${buttonSize.lg} bg-st-primary text-st-white`}>
              템플릿 생성
            </Button>
          </Link>
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="h-750 w-750">
          {data?.templates.map((template, id) => (
            <div
              key={id}
              onClick={() => handleTemplateDetail(template.id)}
              className="group flex cursor-pointer items-center justify-between p-50 transition hover:scale-105 hover:bg-st-gray-50"
            >
              <div className="text-25 font-bold">{template.title}</div>
              <div className="group flex">
                <div className="transform text-15 font-bold text-st-gray-100 transition group-hover:-translate-x-[30px]">
                  생성일 {template.createdAt}
                </div>
                <div
                  onClick={(event) =>
                    handleDeleteTemplate(event, template.id.toString())
                  }
                  className="hidden cursor-pointer gap-20 transition duration-500 group-hover:flex"
                >
                  <Icon
                    name="trash"
                    size={25}
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
