import Image from "next/image";
import LogoImage from "../../../../public/images/logo.png";

const Logo = () => {
  return (
    <div>
      <Image
        src={LogoImage}
        alt=""
      />
    </div>
  );
};

export default Logo;
