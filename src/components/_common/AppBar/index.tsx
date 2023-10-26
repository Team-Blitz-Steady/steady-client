import Image from "next/image";
import { BellIcon } from "@radix-ui/react-icons";
import LogoImage from "../../../../public/images/logo.png";

interface AppBarProps {
  isLogin: boolean;
}

const AppBar = ({ isLogin = false }: AppBarProps) => {
  return (
    <div className="flex items-center justify-between pb-[30px] pt-[30px] md:w-5/6 xl:w-[1120px]">
      <Image
        src={LogoImage}
        alt=""
      />
      {isLogin ? (
        <div className="flex w-[250px] justify-between">
          <div className="text-lg font-bold">내 스테디</div>
          <BellIcon
            width={25}
            height={25}
          />
          <div className="text-lg font-bold">프로필</div>
        </div>
      ) : (
        <div className="text-lg font-bold">로그인</div>
      )}
    </div>
  );
};

export default AppBar;
