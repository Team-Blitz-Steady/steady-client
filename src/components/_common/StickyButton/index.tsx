import Image from "next/image";
import StickyButtonImage from "../../../../public/images/stickybutton.svg";

const StickyButton = () => {
  return (
    <div className="flex items-center justify-center w-[160px] rounded-full shadow-md pl-[10px] pr-[2px] pt-[5px] pb-[5px]">
      <div className="font-bold text-lg">문의하기</div>
      <Image
        src={StickyButtonImage}
        alt=""
      />
    </div>
  );
};

export default StickyButton;
