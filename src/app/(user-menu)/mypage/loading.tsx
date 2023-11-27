import { cn } from "@/lib/utils";
import Icon from "@/components/_common/Icon";
import {
  subBoxStyles,
  subContentStyles,
  subMyPageTextStyles,
} from "@/constants/commonStyle";

const Loading = () => {
  return (
    <div className="flex h-full flex-col gap-100">
      <div className="flex flex-col gap-20">
        <div className="text-30 font-bold">내 프로필</div>
        <div className="flex flex-col items-center justify-center gap-20">
          <div className="h-150 w-150 rounded-full border-2 border-st-gray-200" />

          <div className="absolute top-1/2 flex -translate-y-1/2 transform flex-col items-center justify-center text-center text-lg font-semibold opacity-0 transition-opacity group-hover:opacity-100">
            클릭하여
            <div className="flex flex-row items-center justify-center">
              수정
              <Icon
                name="pencil"
                size={20}
                color="text-st-black"
              />
            </div>
          </div>
          <input
            type="file"
            id="profile"
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-row items-center justify-center gap-10"></div>
        </div>
      </div>
      <div className={cn(subContentStyles)}>
        <div className={cn(subMyPageTextStyles.title)}>포지션 / 스택</div>
        <div className={cn(subBoxStyles)} />
      </div>

      <div className={cn(subContentStyles)}>
        <div className={cn(subMyPageTextStyles.title)}>한 줄 소개</div>
        <div className={cn(subBoxStyles)} />
      </div>

      <div className={cn(subContentStyles)}>
        <div className={cn(subMyPageTextStyles.title)}>소셜 인증</div>
        <div className={cn(subBoxStyles)} />
      </div>
      <div className={cn(subContentStyles)}>
        <div className={cn(subMyPageTextStyles.title)}>회원 탈퇴</div>
        <div className={cn(subBoxStyles)} />
      </div>
    </div>
  );
};

export default Loading;
