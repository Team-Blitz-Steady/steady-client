import type { ComponentProps } from "react";
import { MagnifyingGlassIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

interface InputProps extends ComponentProps<"input"> {
  inputName:
    | "search-input"
    | "name-input"
    | "steady-title-input"
    | "title-input"
    | "tag-input"
    | "introduce-input";
  initialValue?: string;
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: string) => void;
}

const Input = ({
  inputName,
  initialValue,
  onValueChange,
  ...props
}: InputProps) => {
  let input;

  switch (inputName) {
    case "search-input":
      input = (
        <div
          {...props}
          className="bg-input-bg hidden h-40 items-center justify-center rounded-12 border-2 border-solid border-st-gray-100 p-5 outline-none md:flex xl:w-350"
        >
          <input
            className="bg-input-bg h-35 w-full rounded-12 p-5 font-bold outline-none"
            type="text"
            value={initialValue}
            placeholder="검색어를 입력해주세요."
          />
          <IconButton variant="ghost">
            <MagnifyingGlassIcon
              width="25"
              height="25"
              color="#b4b4b4"
            />
          </IconButton>
        </div>
      );
      break;
    case "name-input":
      input = (
        <div>
          <input
            className="max-mobile:w-full h-55 w-400 items-center rounded-12 border-2 border-solid border-st-gray-100 pl-5 pr-5 text-center text-lg outline-none"
            type="text"
            value={initialValue}
            placeholder="닉네임을 입력해주세요."
            onChange={(event) => {
              onValueChange?.(event.target.value);
            }}
          />
        </div>
      );
      break;
    case "steady-title-input":
      input = (
        <div>
          <input
            className="h-60 w-1000 pl-5 pr-5 text-3xl font-bold outline-none"
            type="text"
            value={initialValue}
            placeholder="스테디명"
            onChange={(event) => {
              onValueChange?.(event.target.value);
            }}
          />
        </div>
      );
      break;
    case "title-input":
      input = (
        <div>
          <input
            className="h-60 w-1000 pl-5 pr-5 text-3xl font-bold outline-none"
            type="text"
            value={initialValue}
            placeholder="제목을 입력해주세요."
            onChange={(event) => {
              onValueChange?.(event.target.value);
            }}
          />
        </div>
      );
      break;
    case "tag-input":
      input = (
        <div>
          <input
            className="h-25 w-250 pl-5 pr-5 text-lg outline-none"
            type="text"
            value={initialValue}
            placeholder="태그를 설정하세요 (최대 5개)"
          />
        </div>
      );
      break;
    case "introduce-input":
      input = (
        <div className="flex h-64 items-center justify-center rounded-12 border-2 border-solid border-st-gray-100 p-10 outline-none md:w-1/2 xl:w-716">
          <input
            className="h-60 w-full rounded-12 p-5 text-xl font-bold outline-none"
            type="text"
            value={initialValue}
            placeholder="한 줄 소개로 자신을 표현해 주세요!"
          />
          <IconButton variant="ghost">
            <Pencil1Icon
              width="30"
              height="30"
              color="#b4b4b4"
            />
          </IconButton>
        </div>
      );
      break;
    default:
      input = "";
  }

  return <div>{input}</div>;
};

export default Input;
