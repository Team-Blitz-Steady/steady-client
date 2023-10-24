import { Pencil1Icon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

const Introduce_Input = () => {
  return (
    <div className="flex justify-center w-[716px] h-[64px] rounded-[12px] border border-2 border-solid border-skyblue-100 outline-none mt-[10px]">
      <input
        className="w-[660px] h-[60px] rounded-[12px] text-xl font-bold outline-none p-[5px]"
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
};

export default Introduce_Input;
