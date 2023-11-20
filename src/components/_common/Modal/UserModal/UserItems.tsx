import Link from "next/link";
import SteadyLogo from "@/images/turtle.png";
import { Avatar } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import getUserProfile from "@/services/user/getUserProfile";
import Icon from "../../Icon";
import UserCards from "./UserCards";

const UserItems = ({ userId }: { userId: number }) => {
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
          <div className="rounded-10 bg-st-gray-50 px-10 py-2 text-12 font-bold text-st-gray-200">
            {userProfileData.user.position.name}
          </div>
          <div className="flex items-center justify-center gap-10">
            <div className="text-20 font-bold">
              {userProfileData.user.nickname}
            </div>
            <Link href={`/chat/${userProfileData.user.userId}`}>
              <Icon
                name={"chat"}
                size={20}
                color="text-st-gray-400"
              />
            </Link>
          </div>
          <div className="text-16 text-st-gray-400">
            {userProfileData.user.bio}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <div className="text-15 font-bold">관심스택</div>
          <div>
            {userProfileData.user.stacks.map((stack) => (
              <div
                key={stack.id}
                className="rounded-10 bg-st-gray-50 px-10 py-2 text-12 font-bold text-st-gray-200"
              >
                {stack.name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <div className="text-15 font-bold">받은카드</div>
          <div className="flex h-70 w-400 flex-col items-center justify-evenly shadow-md">
            <UserCards />
            <div className="flex w-full items-center justify-evenly">
              {userProfileData.userCards.map((card) => (
                <div
                  key={card.cardId}
                  className="text-18 font-bold"
                >{`(${card.count})`}</div>
              ))}
            </div>
          </div>
        </div>
        {/* TODO 스크롤... */}
        <div className="flex w-full flex-col items-center justify-center gap-10 overflow-y-auto">
          <div className="text-13 font-bold">한 줄 평</div>
          <div className="flex h-full w-full flex-col overflow-y-auto">
            {userProfileData.reviews.map((review, id) => (
              <div
                key={id}
                className="flex w-full items-center justify-center text-12"
              >
                {review}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserItems;
