import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

const Search_Input = () => {
  return (
    <div className="flex justify-center w-[350px] h-[40px] rounded-[12px] border border-2 border-solid border-skyblue-100 outline-none mt-[10px]">
      <input
        className="w-[310px] h-[35px] rounded-[12px] outline-none p-[5px]"
        type="text"
        placeholder="검색어를 입력해주세요."
      />
      <IconButton variant="ghost">
        <MagnifyingGlassIcon
          width="25"
          height="25"
          color="#9dd5ff"
        />
      </IconButton>
    </div>
  );
};

export default Search_Input;
