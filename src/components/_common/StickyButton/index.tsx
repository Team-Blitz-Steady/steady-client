import Image from "next/image";
import Logo from "@/images/logo.svg";

interface StickyButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const StickyButton = ({ onClick }: StickyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="mobile:bottom-30 flex w-160 items-center justify-center gap-10 rounded-full bg-st-white pb-5 pl-10 pr-2 pt-5 shadow-md"
    >
      <div className="text-lg font-bold">문의하기</div>
      <Image
        src={Logo}
        width={45}
        height={45}
        alt="스테디 로고"
      />
    </button>
  );
};

export default StickyButton;
