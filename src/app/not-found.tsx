import Image from "next/image";
import NotFound from "../../public/images/notfound.png";

const NotFoundPage = () => {
  return (
    <div className="flex h-750 items-center justify-center">
      <Image
        src={NotFound}
        alt="not found image"
        width={400}
        height={200}
      />
    </div>
  );
};

export default NotFoundPage;
