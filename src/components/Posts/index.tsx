import Link from "next/link";
import { Avatar } from "@radix-ui/themes";
import type { Steadies } from "@/services/types";
import Icon from "../_common/Icon";
import Tag from "../_common/Tag";

const Posts = ({ info }: { info: Steadies }) => {
  return (
    <div className="h-[1355px] w-full">
      {info &&
        info.content.map((item, index) => (
          <Link
            href={`/steady/detail/${item.id}`}
            key={index}
          >
            <div
              className={`${
                item.status !== "RECRUITING" && "opacity-50"
              } flex w-full items-center justify-between px-50 py-20 transition hover:scale-105 hover:bg-st-gray-50`}
            >
              <div className="flex items-center gap-50">
                {item.status === "RECRUITING" ? (
                  <Tag status="RECRUITING" />
                ) : (
                  <Tag status="FINISHED" />
                )}

                <div className="flex flex-col gap-5">
                  <div className="font-bold">
                    {item.type === "STUDY" ? "📖스터디" : "🖥프로젝트"}
                  </div>
                  <div className="text-25 font-bold">{item.title}</div>
                  {/* <div className="flex gap-20 text-st-gray-200">
                  {item.map((category, catIndex) => (
                    <div key={catIndex}>#{category}</div>
                  ))}
                </div> */}
                  <div className="flex gap-20">
                    <div className="flex items-center justify-center gap-10 font-bold">
                      <Icon
                        name="person"
                        size={15}
                        color=""
                      />
                      {`${item.numberOfParticipants}/${item.participantLimit}`}
                    </div>
                    <div className="font-bold text-st-gray-100">
                      마감일 | {item.deadline}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-30">
                <div className="flex items-center gap-10 font-bold">
                  <Avatar
                    src={`${
                      item.profileImage.length > 20
                        ? item.profileImage
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-nNEUqRaqDl6w3h_YQwa0T39tLQ0xWwOMg&usqp=CAU"
                    }`}
                    alt="profile"
                    size={"3"}
                    radius="full"
                    className="cursor-pointer"
                    fallback={""}
                  />
                  | {item.nickname}
                </div>
                <div className="flex items-center justify-start gap-10">
                  <div className="flex items-center justify-center gap-5 font-bold text-st-gray-100">
                    <Icon
                      name="eye"
                      size={22}
                      color="text-st-gray-100"
                    />
                    {/* {item.views} */}
                  </div>
                  <div className="flex items-center justify-center gap-5 font-bold text-st-gray-100">
                    <Icon
                      name="chat"
                      size={20}
                      color="text-st-gray-100"
                    />
                    {/* {item.comments} */}
                  </div>
                  <div className="text-15">{item.createdAt}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Posts;
