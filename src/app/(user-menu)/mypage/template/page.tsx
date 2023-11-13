"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import getTemplates from "@/services/template/getTemplates";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";

const MyTemplatePage = () => {
  const { data } = useQuery({ queryKey: ["templates"], queryFn: getTemplates });

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
          {data?.templates.map((form, id) => (
            <Link
              key={id}
              href={`/mypage/template/edit/${form.id}`}
            >
              <div className="group flex items-center justify-between p-50 transition hover:scale-105 hover:bg-st-gray-50">
                <div className="text-25 font-bold">{form.title}</div>
                <div className="group flex">
                  <div className="transform text-15 font-bold text-st-gray-100 transition group-hover:-translate-x-[30px]">
                    생성일 {form.createdAt}
                  </div>
                  <div className="hidden gap-20 transition duration-500 group-hover:flex">
                    <Icon
                      name="trash"
                      size={20}
                      color="text-st-gray-100"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
      </div>
    </div>
  );
};

export default MyTemplatePage;
