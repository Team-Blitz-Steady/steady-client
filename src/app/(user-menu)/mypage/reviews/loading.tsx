import { cn } from "@/lib/utils";
import { subMyPageTextStyles } from "@/constants/commonStyle";

const Loading = () => {
  return (
    <div className="flex h-full w-fit flex-col gap-100">
      <div className="text-30 font-bold">내가 받은 리뷰</div>
      <div className={cn("flex flex-col gap-30")}>
        <div className={cn(subMyPageTextStyles.title)}>받은 카드</div>
        <div
          className={cn(
            "flex h-116 w-718 items-center justify-evenly rounded-6 border-2 border-st-gray-100 px-30 py-20",
          )}
        />
      </div>
      <div className={cn("flex w-718 flex-col gap-30")}>
        <div className={cn(subMyPageTextStyles.title)}>한 줄 평</div>
      </div>
    </div>
  );
};

export default Loading;
