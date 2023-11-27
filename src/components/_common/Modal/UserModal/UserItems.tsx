import Image from "next/image";
import DeleteUserLogo from "@/images/DeleteUser.svg";
import { useSuspenseQuery } from "@tanstack/react-query";
import getUserProfile from "@/services/user/getUserProfile";
import { getUserProfileKey } from "@/constants/queryKeys";

const UserItems = ({ userId }: { userId: number }) => {
  const { data: userProfileData } = useSuspenseQuery({
    queryKey: getUserProfileKey(userId),
    queryFn: () => getUserProfile(userId.toString()),
    staleTime: 10000,
  });

  return (
    <>
      {!userProfileData.isDeleted ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-20">
          <div className="flex w-full flex-col items-center justify-center gap-10">
            <Image
              className="cursor-pointer rounded-full border-1"
              src={userProfileData.user.profileImage}
              alt="유저 프로필 이미지"
              width={100}
              height={100}
            />
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="text-20 font-bold">
                {userProfileData.user.nickname}
              </div>
              <div className="rounded-10 bg-st-gray-50 px-10 py-2 text-12 font-bold text-st-gray-200">
                {userProfileData.user.position.name}
              </div>
            </div>
          </div>
          <div className="text-16 text-st-gray-400">
            {userProfileData.user.bio}
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-10">
            <div className="text-15 font-bold">관심스택</div>
            <div className="flex gap-10">
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
            <div className="flex h-70 w-400 items-center justify-evenly shadow-md">
              {userProfileData.userCards.map((card) => (
                <div
                  key={card.cardId}
                  className="flex flex-col items-center justify-center"
                >
                  <Image
                    src={card.imageUrl}
                    alt="카드 이미지"
                    width={35}
                    height={35}
                  />
                  <div className="text-18 font-bold">{`(${card.count})`}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-grow flex-col items-center justify-center gap-10 overflow-y-auto">
            <div className="text-13 font-bold">한 줄 평</div>
            <div className="flex h-200 w-full flex-col overflow-y-scroll">
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
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-evenly gap-20">
          <Image
            src={DeleteUserLogo}
            alt="탈퇴한 유저 이미지"
            width={200}
            height={200}
          />
          <div className="text-25 font-bold">탈퇴한 유저 입니다.</div>
        </div>
      )}
    </>
  );
};

export default UserItems;
