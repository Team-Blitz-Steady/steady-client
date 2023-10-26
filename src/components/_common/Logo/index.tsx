import Image from "next/image";
import LogoImage from "../../../../public/images/logo.png";

const Logo = () => {
  return (
    <div>
      <Image
        src={LogoImage}
        alt="스테디 로고"
      />
    </div>
  );
};

export default Logo;
