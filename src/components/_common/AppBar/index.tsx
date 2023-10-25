import Image from "next/image";
import { BellIcon } from "@radix-ui/react-icons";
import LogoImage from "../../../../public/images/logo.png";

interface AppBarProps {
  isLogin: boolean;
}

const AppBar = ({ isLogin = false }: AppBarProps) => {
  return isLogin ? (
    <div className="flex md:w-5/6 xl:w-[1120px] items-center justify-between pt-[30px] pb-[30px]">
      <Image
        src={LogoImage}
        alt=""
      />
      <div className="flex w-[250px] justify-between">
        <div className="font-bold text-lg">내 스테디</div>
        <BellIcon
          width={25}
          height={25}
        />
        <div className="font-bold text-lg">프로필</div>
      </div>
    </div>
  ) : (
    <div className="flex md:w-5/6 xl:w-[1120px] items-center justify-between pt-[30px] pb-[30px]">
      <Image
        src={LogoImage}
        alt=""
      />
      <div className="font-bold">로그인</div>
    </div>
  );
};

export default AppBar;
