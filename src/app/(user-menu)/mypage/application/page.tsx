"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useRouter } from "next/navigation";
import deleteApplication from "@/services/application/deleteApplication";
import Icon from "@/components/_common/Icon";
import DeleteModal from "@/components/_common/Modal/DeleteModal";
import useApplicationListQuery from "@/hooks/query/useApplicationListQuery";

const MyApplicationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationId, setApplicationId] = useState("0");
  const router = useRouter();
  const { applicationListData, hasNextPage, fetchNextPage, refetch } =
    useApplicationListQuery();

  const handleApplicationDetail = (steadyId: number, applicationId: number) => {
    router.push(`/application/edit/${steadyId}/${applicationId}`);
  };

  const handleDeleteApplication = async (id: string) => {
    const data = await deleteApplication(id);
    if (!data) {
      refetch();
    }
  };

  const openModal = (id: string) => {
    setApplicationId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex gap-30">
      <div>
        <div className="flex justify-between p-20 text-30 font-bold">
          내 신청서 관리
          <div className="flex items-center justify-center gap-20">
            <div className="flex items-center justify-center gap-10 text-20 font-bold">
              <div className="h-10 w-10 rounded-full bg-st-green"></div>
              승인
            </div>
            <div className="flex items-center justify-center gap-10 text-20 font-bold">
              <div className="h-10 w-10 rounded-full bg-st-red"></div>
              거절
            </div>
            <div className="flex items-center justify-center gap-10 text-20 font-bold">
              <div className="h-10 w-10 rounded-full bg-st-primary"></div>
              대기
            </div>
          </div>
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="h-750 w-750 overflow-x-hidden overflow-y-scroll">
          <InfiniteScroll
            hasMore={hasNextPage}
            loadMore={() => fetchNextPage()}
            useWindow={false}
          >
            {applicationListData.pages.map((applications) =>
              applications.content.map((application) => (
                <div
                  key={application.applicationId}
                  onClick={() =>
                    handleApplicationDetail(
                      application.steadyId,
                      application.applicationId,
                    )
                  }
                  className="group flex cursor-pointer items-center justify-between p-50 transition hover:scale-105 hover:bg-st-gray-50"
                >
                  <div className="text-25 font-bold">
                    {application.status === "ACCEPTED" ? (
                      <div className="flex items-center justify-center gap-10">
                        {application.steadyName}
                        <div className="h-10 w-10 rounded-full bg-st-green"></div>
                      </div>
                    ) : application.status === "REJECTED" ? (
                      <div className="flex items-center justify-center gap-10">
                        {application.steadyName}
                        <div className="h-10 w-10 rounded-full bg-st-red"></div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-10">
                        {application.steadyName}
                        <div className="h-10 w-10 rounded-full bg-st-primary"></div>
                      </div>
                    )}
                  </div>
                  <div className="group flex">
                    <div className="transform text-15 font-bold text-st-gray-100 transition group-hover:-translate-x-[30px]">
                      제출일 {application.createdAt.slice(0, 10)}
                    </div>
                    <div
                      onClick={(event) => {
                        event.stopPropagation();
                        openModal(application.applicationId.toString());
                      }}
                      className="hidden gap-20 transition duration-500 group-hover:flex"
                    >
                      <Icon
                        name="trash"
                        size={25}
                        color="text-st-gray-100"
                      />
                    </div>
                  </div>
                </div>
              )),
            )}
          </InfiniteScroll>
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDeleteApplication}
        id={applicationId}
      />
    </div>
  );
};

export default MyApplicationPage;
