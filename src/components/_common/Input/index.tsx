import { MagnifyingGlassIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

const Input = ({ inputName = "" }) => {
  let input;

  switch (inputName) {
    case "search-input":
      input = (
        <div className="mt-[10px] hidden h-[40px] items-center justify-center rounded-[12px] border border-2 border-solid border-skyblue-100 p-[5px] outline-none md:flex md:w-1/4 xl:w-[350px]">
          <input
            className="h-[35px] w-full rounded-[12px] p-[5px] outline-none"
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
            className="mt-[10px] h-[56px] w-[523px] items-center rounded-[12px] border border-2 border-solid border-skyblue-100 pl-[5px] pr-[5px] text-center text-lg outline-none"
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
            className="mt-[10px] h-[60px] w-[1000px] pl-[5px] pr-[5px] text-3xl font-bold outline-none"
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
            className="mt-[10px] h-[60px] w-[1000px] pl-[5px] pr-[5px] text-3xl font-bold outline-none"
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
            className="mt-[10px] h-[25px] w-[250px] pl-[5px] pr-[5px] text-lg outline-none"
            type="text"
            placeholder="태그를 설정하세요 (최대 5개)"
          />
        </div>
      );
      break;
    case "introduce-input":
      input = (
        <div className="mt-[10px] flex h-[64px] items-center justify-center rounded-[12px] border border-2 border-solid border-skyblue-100 p-[10px] outline-none md:w-1/2 xl:w-[716px]">
          <input
            className="h-[60px] w-full rounded-[12px] p-[5px] text-xl font-bold outline-none"
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
