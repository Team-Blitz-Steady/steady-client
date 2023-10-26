import Image from "next/image";
import StickyButtonImage from "../../../../public/images/stickybutton.svg";

interface StickyButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const StickyButton = ({ onClick }: StickyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex w-[160px] items-center justify-center rounded-full pb-[5px] pl-[10px] pr-[2px] pt-[5px] shadow-md"
    >
      <div className="text-lg font-bold">문의하기</div>
      <Image
        src={StickyButtonImage}
        alt=""
      />
    </button>
  );
};

export default StickyButton;
