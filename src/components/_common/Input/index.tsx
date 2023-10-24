import { MagnifyingGlassIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

const Input = ({ inputName = "" }) => {
  let input;

  switch (inputName) {
    case "search-input":
      input = (
        <div className="hidden md:flex justify-center md:w-1/4 xl:w-[350px] h-[40px] rounded-[12px] border border-2 border-solid border-skyblue-100 outline-none mt-[10px]">
          <input
            className="w-full h-[35px] rounded-[12px] outline-none p-[5px]"
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
      break;
    case "name-input":
      input = (
        <div>
          <input
            className="w-[523px] h-[56px] rounded-[12px] text-center items-center text-lg border border-2 border-solid border-skyblue-100 outline-none mt-[10px] pl-[5px] pr-[5px]"
            type="text"
            placeholder="닉네임을 입력해주세요."
          />
        </div>
      );
      break;
    case "steady-title-input":
      input = (
        <div>
          <input
            className="w-[1000px] h-[60px] font-bold text-3xl outline-none mt-[10px] pl-[5px] pr-[5px]"
            type="text"
            placeholder="스테디명"
          />
        </div>
      );
      break;
    case "title-input":
      input = (
        <div>
          <input
            className="w-[1000px] h-[60px] font-bold text-3xl outline-none mt-[10px] pl-[5px] pr-[5px]"
            type="text"
            placeholder="제목을 입력해주세요."
          />
        </div>
      );
      break;
    case "tag-input":
      input = (
        <div>
          <input
            className="w-[250px] h-[25px] text-lg outline-none mt-[10px] pl-[5px] pr-[5px]"
            type="text"
            placeholder="태그를 설정하세요 (최대 5개)"
          />
        </div>
      );
      break;
    case "introduce-input":
      input = (
        <div className="flex justify-center items-center md:w-1/2 xl:w-[716px] h-[64px] rounded-[12px] border border-2 border-solid border-skyblue-100 outline-none mt-[10px] p-[10px]">
          <input
            className="w-full h-[60px] rounded-[12px] text-xl font-bold outline-none p-[5px]"
            type="text"
            placeholder="한 줄 소개로 자신을 표현해 주세요!"
          />
          <IconButton variant="ghost">
            <Pencil1Icon
              width="30"
              height="30"
              color="#9dd5ff"
            />
          </IconButton>
        </div>
      );
  }

  return <div>{input}</div>;
};

export default Input;
