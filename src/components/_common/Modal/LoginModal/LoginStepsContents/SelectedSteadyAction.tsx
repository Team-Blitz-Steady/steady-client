import Link from "next/link";
import useIsSearchBarFocusStore from "@/stores/isSearchBarFocus";

const SelectedSteadyAction = () => {
  const { setIsFocus } = useIsSearchBarFocusStore();
  const handleClickSearchAction = () => {
    setIsFocus(true);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <div className="text-25 font-bold">🧐 스테디에 참여하고 싶은 사람</div>
        <Link
          href={"/"}
          className="h-200 w-full"
        >
          <button
            onClick={handleClickSearchAction}
            className="text-black h-full w-full rounded-10 text-30 font-bold hover:bg-st-skyblue-50"
          >
            🔎 스테디 검색
          </button>
        </Link>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <div className="text-25 font-bold">🤗 스테디를 운영하고 싶은 사람</div>
        <Link
          href={"/steady/create"}
          className="h-200 w-full"
        >
          <button className="text-black h-full w-full rounded-10 text-30 font-bold hover:bg-st-skyblue-50">
            ✍️ 스테디 생성
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectedSteadyAction;
