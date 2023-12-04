import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import getMyProfile from "@/services/user/getMyProfile";
import { MyProfileKey } from "@/constants/queryKeys";
import { appBarTextStyles } from ".";
import Dropdown from "../Dropdown";
import NotificationPopup from "../NotificationPopup";

const AuthAppBar = () => {
  const { data: myProfileData } = useSuspenseQuery({
    queryKey: MyProfileKey,
    queryFn: () => getMyProfile(),
  });

  return (
    <div className="flex w-150 items-center justify-between sm:w-170 md:w-250">
      <Link href={"/mysteady"}>
        <div className={cn(appBarTextStyles, "w-50 md:w-80")}>내 스테디</div>
      </Link>
      <NotificationPopup />
      <Dropdown
        options={[
          { label: "마이페이지", linkTo: "/mypage" },
          { label: "로그아웃", linkTo: "/logout" },
        ]}
      >
        <div className="flex h-30 w-30 items-center justify-center md:h-45 md:w-45">
          <Image
            className="aspect-square rounded-full border-1"
            src={myProfileData.profileImage}
            alt="유저 로고"
            width={45}
            height={45}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default AuthAppBar;
