import Image from "next/image";
import LogoImage from "@/images/logo.png";
import { BellIcon } from "@radix-ui/react-icons";
import LoginModalContainer from "../Modal/LoginModal";

interface AppBarProps {
  isLogin: boolean;
}

export const appBarTextStyles = "text-lg font-bold";

const AppBar = ({ isLogin = false }: AppBarProps) => {
  return (
    <div className="md:w-5/6 xl:w-1120 flex items-center justify-between pb-30 pt-30">
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
        <LoginModalContainer
          trigger={
            <div className={`${appBarTextStyles} cursor-pointer`}>로그인</div>
          }
        />
      )}
    </div>
  );
};

export default AppBar;
