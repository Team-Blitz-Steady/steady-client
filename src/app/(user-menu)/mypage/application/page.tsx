"use client";

import Link from "next/link";
import Icon from "@/components/_common/Icon";

const MyApplicationPage = () => {
  const data = [
    {
      id: 1,
      steadyTitle: "넥터디",
      status: "APPROVED",
      createdAt: "2023.11.15",
    },
    {
      id: 2,
      steadyTitle: "넥터디",
      status: "REJECTED",
      createdAt: "2023.11.15",
    },
    {
      id: 3,
      steadyTitle: "넥터디",
      status: "PENDING",
      createdAt: "2023.11.15",
    },
  ];

  return (
    <div className="flex gap-30">
      <div>
        <div className="flex justify-between p-20 text-30 font-bold">
          내 신청서 관리
          <div className="flex items-center justify-center gap-10 text-20 font-bold">
            <div className="h-10 w-10 rounded-full bg-st-green"></div>
            승인
            <div className="h-10 w-10 rounded-full bg-st-red"></div>
            거절
            <div className="h-10 w-10 rounded-full bg-st-primary"></div>
            보류
          </div>
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="h-750 w-750">
          {data.map((application, index) => (
            <Link
              key={index}
              href={`/application/edit/${application.id}`}
            >
              <div className="group flex items-center justify-between p-50 transition hover:scale-105 hover:bg-st-gray-50">
                <div className="text-25 font-bold">
                  {application.status === "APPROVED" ? (
                    <div className="flex items-center justify-center gap-10">
                      {application.steadyTitle}
                      <div className="h-10 w-10 rounded-full bg-st-green"></div>
                    </div>
                  ) : application.status === "REJECTED" ? (
                    <div className="flex items-center justify-center gap-10">
                      {application.steadyTitle}
                      <div className="h-10 w-10 rounded-full bg-st-red"></div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-10">
                      {application.steadyTitle}
                      <div className="h-10 w-10 rounded-full bg-st-primary"></div>
                    </div>
                  )}
                </div>
                <div className="group flex">
                  <div className="transform text-15 font-bold text-st-gray-100 transition group-hover:-translate-x-[30px]">
                    제출일 {application.createdAt}
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

export default MyApplicationPage;
