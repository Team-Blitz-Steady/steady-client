import { useRouter } from "next/navigation";
import useIsSearchBarFocusStore from "@/stores/isSearchBarFocus";
import useLoginModalOpenStore from "@/stores/loginModalOpen";

const SelectedSteadyAction = () => {
  const router = useRouter();
  const { setIsFocus } = useIsSearchBarFocusStore();
  const { setIsOpen } = useLoginModalOpenStore();

  const handleClickSearchAction = () => {
    router.push("/");
    setIsFocus(true);
    setIsOpen(false);
  };

  const handleClickCreateAction = () => {
    router.push("/steady/create");
    setIsOpen(false);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <div className="text-25 font-bold">🧐 스테디에 참여하고 싶은 사람</div>

        <button
          onClick={handleClickSearchAction}
          className="text-black h-200 w-full rounded-10 text-30 font-bold hover:bg-st-skyblue-50"
        >
          🔎 스테디 검색
        </button>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <div className="text-25 font-bold">🤗 스테디를 운영하고 싶은 사람</div>

        <button
          className="text-black h-200 w-full rounded-10 text-30 font-bold hover:bg-st-skyblue-50"
          onClick={handleClickCreateAction}
        >
          ✍️ 스테디 생성
        </button>
      </div>
    </div>
  );
};

export default SelectedSteadyAction;
