import { useRouter } from "next/navigation";
import SteadyLogo from "@/images/turtle.png";
import { Avatar } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import getUserProfile from "@/services/user/getUserProfile";
import { userCardsType } from "@/constants/userCards";
import Button, { buttonSize } from "../../Button";

const UserItems = ({ userId }: { userId: number }) => {
  const router = useRouter();
  const { data: userProfileData } = useSuspenseQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId.toString()),
    staleTime: 10000,
  });

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-20">
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <Avatar
            src={userProfileData.user.profileImage ?? `/${SteadyLogo}`}
            alt="유저 프로필 이미지"
            size={"6"}
            radius="full"
            className="cursor-pointer"
            fallback={""}
          />
          <div className="text-25 font-bold">
            {userProfileData.user.nickname}
          </div>
          <div className="text-18 text-st-gray-400">
            {userProfileData.user.bio}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <div className="text-20 font-bold">관심스택</div>
          <div>
            {userProfileData.user.stacks.map((stack) => (
              <div key={stack.id}>{stack.name}</div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <div className="text-20 font-bold">받은카드</div>
          <div className="flex h-80 w-400 flex-col items-center justify-evenly shadow-md">
            <div className="flex items-center justify-evenly">
              {userCardsType.map((item, id) => (
                <div
                  key={id}
                  className="text-30"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex">
              {userProfileData.userCards.map((card) => (
                <div
                  key={card.cardId}
                  className="text-25"
                >{`(${card.count})`}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <div className="text-15 font-bold">한 줄 평</div>
          <div>{userProfileData.reviews.slice(0, 3)}</div>
        </div>
      </div>
      <Button
        onClick={() => router.push(`/review/${userProfileData.user.userId}`)}
        className={`${buttonSize.sm} bg-st-primary text-center text-15 font-bold text-st-white`}
      >
        리뷰 보기
      </Button>
    </>
  );
};

export default UserItems;
