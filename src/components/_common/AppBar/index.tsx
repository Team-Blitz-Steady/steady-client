import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/images/logo.png";
import { BellIcon } from "@radix-ui/react-icons";
import { Avatar } from "@radix-ui/themes";
import Dropdown from "@/components/_common/Dropdown";
import LoginModal from "../Modal/LoginModal";

interface AppBarProps {
  isLogin: boolean;
}

export const appBarTextStyles = "text-lg font-bold";

const AppBar = ({ isLogin = false }: AppBarProps) => {
  return (
    <div className="flex items-center justify-between pb-30 pt-30 md:w-5/6 xl:w-1120">
      <Link href={"/"}>
        <Image
          src={LogoImage}
          alt="스테디 로고"
        />
      </Link>
      {isLogin ? (
        <div className="flex w-250 justify-between">
          <div className={appBarTextStyles}>내 스테디</div>
          <BellIcon
            width={25}
            height={25}
          />
          <div className={appBarTextStyles}>
            <Dropdown options={[{ label: "마이페이지", linkTo: "/mypage" }]}>
              <Avatar
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-nNEUqRaqDl6w3h_YQwa0T39tLQ0xWwOMg&usqp=CAU"
                }
                alt="profile"
                size={"3"}
                radius="full"
                className="cursor-pointer"
                fallback={""}
              />
            </Dropdown>
          </div>
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
