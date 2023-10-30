import Image from "next/image";
import LogoImage from "@/images/logo.png";
import { BellIcon } from "@radix-ui/react-icons";
import LoginModal from "../Modal/LoginModal";

interface AppBarProps {
  isLogin: boolean;
}

export const appBarTextStyles = "text-lg font-bold";

const AppBar = ({ isLogin = false }: AppBarProps) => {
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
        <LoginModal
          trigger={
            <div className={`${appBarTextStyles} cursor-pointer`}>로그인</div>
          }
        />
      )}
    </div>
  );
};

export default AppBar;
