import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import type { MySteadyContentType } from "@/services/types";
import ContactTag from "@/components/_common/ContactTag";
import Dropdown from "@/components/_common/Dropdown";
import Icon from "@/components/_common/Icon";

const Steadies = ({
  steady,
  search,
}: {
  steady: MySteadyContentType;
  search?: string;
}) => {
  const { toast } = useToast();

  const renderIcon = () => {
    if (search === "finished") {
      return <div className="h-20 w-20" />;
    }
    if (steady.isLeader && search !== "finished") {
      return (
        <Dropdown
          options={[
            {
              label: "스테디 수정",
              linkTo: `/steady/edit/${steady.steadyId}`,
            },
            {
              label: "스테디 질문 수정",
              linkTo: `/steady/edit/questions/${steady.steadyId}`,
            },
            {
              label: "스테디 운영",
              linkTo: `/steady/manage/${steady.steadyId}`,
            },
          ]}
        >
          <div className="cursor-pointer">
            <Icon
              name="gear"
              size={20}
              color="text-st-black"
            />
          </div>
        </Dropdown>
      );
    }
    if (!steady.isLeader && (search === "recruiting" || search === "closed")) {
      return (
        <div
          onClick={() =>
            toast({ description: "준비중인 기능입니다!", variant: "blue" })
          }
        >
          <Icon
            name="exit"
            size={20}
            color="text-st-black"
          />
        </div>
      );
    }
    return <div className="h-20 w-20" />;
  };

  return (
    <>
      <Link
        href={`/steady/detail/${steady.steadyId}`}
        className="flex h-full w-fit flex-grow"
      >
        <div className="text-black flex w-full items-center text-center font-bold sm:text-15 md:text-20 lg:text-25">
          {steady.isLeader ? `👑 ${steady.name}` : `${steady.name}`}
        </div>
      </Link>
      <div className="flex items-center justify-center gap-20">
        <ContactTag contactUrl={steady.contact} />
        <div className="text-bold max-w-fit text-15 text-st-gray-100 max-sm:hidden">
          {steady.isLeader ? "생성일: " : "참여일: "}
          {format(new Date(steady.joinedAt), "yyyy.MM.dd")}
        </div>
        {renderIcon()}
      </div>
    </>
  );
};

export default Steadies;
