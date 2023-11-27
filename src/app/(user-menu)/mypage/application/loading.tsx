const Loading = () => {
  return (
    <div className="flex gap-30">
      <div>
        <div className="flex justify-between p-20 text-30 font-bold">
          내 신청서 관리
          <div className="flex items-center justify-center gap-20">
            <div className="flex items-center justify-center gap-10 text-20 font-bold">
              <div className="h-10 w-10 rounded-full bg-st-green" />
              승인
            </div>
            <div className="flex items-center justify-center gap-10 text-20 font-bold">
              <div className="h-10 w-10 rounded-full bg-st-red" />
              거절
            </div>
            <div className="flex items-center justify-center gap-10 text-20 font-bold">
              <div className="h-10 w-10 rounded-full bg-st-primary" />
              대기
            </div>
          </div>
        </div>
        <div className="h-5 w-full bg-st-gray-400"></div>
        <div className="h-750 w-750 overflow-x-hidden overflow-y-scroll" />
        <div className="h-5 w-full bg-st-gray-400"></div>
      </div>
    </div>
  );
};

export default Loading;
