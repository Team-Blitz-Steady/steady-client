import Link from "next/link";
import Button from "@/components/_common/Button";
import { emptySteadiesMessage } from "./utils/emptySteadiesMessage";

const EmptySteady = ({ search }: { search?: string }) => {
  return (
    <>
      <div className="max-sm:text-22 sm:text-22 md:text-25 lg:text-28 xl:text-30">
        {search && emptySteadiesMessage(search)}
        스테디가 없습니다.
      </div>
      <Link href="/steady/create">
        <Button className="h-50 w-200 bg-st-primary text-20 text-st-white">
          스테디 생성하기
        </Button>
      </Link>
    </>
  );
};

export default EmptySteady;
