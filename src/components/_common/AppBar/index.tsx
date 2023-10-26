import Image from "next/image";
import { BellIcon } from "@radix-ui/react-icons";
import LogoImage from "../../../../public/images/logo.png";

interface AppBarProps {
  isLogin: boolean;
}

const AppBar = ({ isLogin = false }: AppBarProps) => {
  const appBarTextStyles = "text-lg font-bold";
  return (
    <div className="flex items-center justify-between pb-30 pt-30 md:w-5/6 xl:w-1120">
      <Image
        src={LogoImage}
        alt="스테디 로고"
      />
      {isLogin ? (
        <div className="flex w-250 justify-between">
          <div className={appBarTextStyles}>내 스테디</div>
          <BellIcon
            width={25}
            height={25}
          />
          <div className={appBarTextStyles}>프로필</div>
        </div>
      ) : (
        <div className={appBarTextStyles}>로그인</div>
      )}
    </div>
  );
};

export default AppBar;
