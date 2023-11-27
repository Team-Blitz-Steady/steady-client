const Loading = () => {
  return (
    <div className="flex gap-30">
      <div>
        <div className="flex justify-between p-20 text-30 font-bold">
          내 템플릿
        </div>
        <div className="h-5 w-full bg-st-gray-400" />
        <div className="h-750 w-750 overflow-x-hidden overflow-y-scroll" />
        <div className="h-5 w-full bg-st-gray-400" />
      </div>
    </div>
  );
};

export default Loading;
