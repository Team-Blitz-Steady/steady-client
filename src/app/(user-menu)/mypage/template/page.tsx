"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import deleteTemplate from "@/services/template/deleteTemplate";
import getTemplates from "@/services/template/getTemplates";
import Button, { buttonSize } from "@/components/_common/Button";
import Icon from "@/components/_common/Icon";
import DeleteModal from "@/components/_common/Modal/DeleteModal";
import { TemplatesKey } from "@/constants/queryKeys";

const MyTemplatePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templateId, setTemplateId] = useState("0");
  const { data, refetch } = useQuery({
    queryKey: TemplatesKey,
    queryFn: getTemplates,
  });
  const router = useRouter();

  const handleDeleteTemplate = async (id: string) => {
    const data = await deleteTemplate(id);
    if (!data) {
      refetch();
    }
  };

  const handleTemplateDetail = (id: number) => {
    router.push(`/mypage/template/edit/${id}`);
  };

  const openModal = (id: string) => {
    setTemplateId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex gap-30 max-sm:w-400 sm:w-500 md:w-400 lg:w-600 xl:w-750">
      <div className="w-full">
        <div className="flex justify-between px-20 pb-10 text-20 font-bold lg:text-28 xl:text-30">
          내 템플릿
          <Link href={"/mypage/template/create"}>
            <Button className={`${buttonSize.sm} bg-st-primary text-st-white`}>
              템플릿 생성
            </Button>
          </Link>
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="h-650 w-full overflow-x-hidden overflow-y-scroll">
          {data?.templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateDetail(template.id)}
              className="group flex cursor-pointer items-center justify-between p-40 transition hover:scale-105 hover:bg-st-gray-50"
            >
              <div className="text-10 font-bold sm:text-16">
                {template.title}
              </div>
              <div className="group flex">
                <div className="transform text-10 font-bold text-st-gray-100 transition group-hover:-translate-x-[15px] lg:text-15 lg:group-hover:-translate-x-[30px]">
                  생성일 {template.createdAt.slice(0, 10)}
                </div>
                <div
                  onClick={(event) => {
                    event.stopPropagation();
                    openModal(template.id.toString());
                  }}
                  className="hidden cursor-pointer gap-20 transition duration-500 group-hover:flex"
                >
                  <Icon
                    name="trash"
                    size={20}
                    color="text-st-gray-100 w-15 h-15 lg:w-20 lg:h-20"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDeleteTemplate}
        id={templateId}
      />
    </div>
  );
};

export default MyTemplatePage;
