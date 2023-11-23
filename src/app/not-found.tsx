import Image from "next/image";
import Link from "next/link";
import Button, { buttonSize } from "@/components/_common/Button";
import NotFound from "../../public/images/notfound.png";

const NotFoundPage = () => {
  return (
    <div className="flex h-750 flex-col items-center justify-center">
      <Image
        src={NotFound}
        alt="not found image"
        width={400}
        height={200}
      />
      <Button className={`${buttonSize.md} mt-30 bg-st-primary text-st-white`}>
        <Link
          href={"/"}
          replace={true}
        >
          홈으로
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
