import type { ReactNode } from "react";

export const buttonsConfig = {
  create: "w-[165px] h-[50px] rounded-[6px] bg-[#9dd5ff] shadow-md",
  lg: "w-[200px] h-[80px] rounded-[6px] bg-[#ff5353]",
  sm: {
    white: "w-[115px] h-[40px] rounded-[15px] bg-[#ffffff] shadow-md",
    blue: "w-[115px] h-[40px] rounded-[15px] bg-[#0d99ff] shadow-md",
    red: "w-[115px] h-[40px] rounded-[15px] bg-[#ff5353] shadow-md",
    green: "w-[115px] h-[40px] rounded-[15px] bg-[#35cc00] shadow-md",
  },
  sm2: "w-[130px] h-[40px] rounded-[15px] bg-[#0d99ff] shadow-md",
  sm3: "w-[160px] h-[40px] rounded-[15px] bg-[#0d99ff] shadow-md",
  md: "w-[130px] h-[50px] rounded-[15px] bg-[#ff5353] shadow-md",
  modal: {
    white: "w-[130px] h-[55px] rounded-[15px] bg-[#ffffff] shadow-md",
    blue: "w-[130px] h-[55px] rounded-[15px] bg-[#0d99ff] shadow-md",
    red: "w-[130px] h-[55px] rounded-[15px] bg-[#ff5353] shadow-md",
    green: "w-[130px] h-[55px] rounded-[15px] bg-[#35cc00] shadow-md",
  },
};

interface buttonProps {
  children: ReactNode;
  buttonStyles: string;
}

const Button = ({ children, buttonStyles }: buttonProps) => {
  return <button className={`${buttonStyles}`}>{children}</button>;
};

export default Button;
