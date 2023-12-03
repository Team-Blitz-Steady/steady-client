"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useRouter } from "next/navigation";
import deleteApplication from "@/services/application/deleteApplication";
import Icon from "@/components/_common/Icon";
import DeleteModal from "@/components/_common/Modal/DeleteModal";
import useApplicationListQuery from "@/hooks/query/useApplicationListQuery";
import formattedCreatedAt from "@/utils/formattedCreatedAt";

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
    <div className="flex gap-30 max-sm:w-400 sm:w-500 md:w-400 lg:w-600 xl:w-750">
      <div className="w-full">
        <div className="flex justify-between px-20 pb-10 text-20 font-bold lg:text-28 xl:text-30">
          내 신청서 관리
          <div className="flex items-center justify-center gap-10 lg:gap-20">
            <div className="flex items-center justify-center gap-5 text-12 font-bold lg:flex-row lg:gap-10 lg:text-15 xl:text-25">
              <div className="h-7 w-7 rounded-full bg-st-green lg:h-10 lg:w-10"></div>
              <span>승인</span>
            </div>
            <div className="flex items-center justify-center gap-5 text-12 font-bold lg:flex-row lg:gap-10 lg:text-15 xl:text-25">
              <div className="h-7 w-7 rounded-full bg-st-red lg:h-10 lg:w-10"></div>
              <span>거절</span>
            </div>
            <div className="flex items-center justify-center gap-5 text-12 font-bold lg:flex-row lg:gap-10 lg:text-15 xl:text-25">
              <div className="h-7 w-7 rounded-full bg-st-primary lg:h-10 lg:w-10"></div>
              <span>대기</span>
            </div>
          </div>
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="h-650 w-full overflow-x-hidden overflow-y-scroll">
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
                  className="group flex cursor-pointer items-center justify-between p-40 transition hover:scale-105 hover:bg-st-gray-50"
                >
                  <div className="text-20 font-bold lg:text-23 xl:text-25">
                    {application.status === "ACCEPTED" ? (
                      <div className="flex items-center justify-center gap-10 text-10 sm:text-16">
                        {application.steadyName}
                        <div className="h-5 w-5 rounded-full bg-st-green lg:h-8 lg:w-8"></div>
                      </div>
                    ) : application.status === "REJECTED" ? (
                      <div className="flex items-center justify-center gap-10 sm:text-16">
                        {application.steadyName}
                        <div className="h-5 w-5 rounded-full bg-st-red lg:h-8 lg:w-8"></div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-10 text-10 sm:text-16">
                        {application.steadyName}
                        <div className="h-5 w-5 rounded-full bg-st-primary lg:h-8 lg:w-8"></div>
                      </div>
                    )}
                  </div>
                  <div className="group flex">
                    <div className="transform text-10 font-bold text-st-gray-100 transition group-hover:-translate-x-[15px] lg:text-15 lg:group-hover:-translate-x-[30px]">
                      제출일{" "}
                      {formattedCreatedAt(application.createdAt, "yyyy-MM-dd")}
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
                        size={20}
                        color="text-st-gray-100 w-15 h-15 lg:w-20 lg:h-20"
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
