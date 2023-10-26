import Image from "next/image";
import StickyButtonImage from "../../../../public/images/stickybutton.svg";

interface StickyButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const StickyButton = ({ onClick }: StickyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex w-160 items-center justify-center rounded-full pb-5 pl-10 pr-2 pt-5 shadow-md"
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
