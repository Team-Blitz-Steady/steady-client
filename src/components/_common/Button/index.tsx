import type { ReactNode } from "react";

export const buttonsConfig = {
  create: "w-[165px] h-[50px]  bg-[#9dd5ff]",
  lg: "w-[200px] h-[80px] bg-[#ff5353]",
  sm: {
    white: "w-[115px] h-[40px] bg-[#ffffff]",
    blue: "w-[115px] h-[40px] bg-[#0d99ff]",
    red: "w-[115px] h-[40px] bg-[#ff5353]",
    green: "w-[115px] h-[40px] bg-[#35cc00]",
  },
  sm2: "w-[130px] h-[40px] bg-[#0d99ff]",
  sm3: "w-[160px] h-[40px] bg-[#0d99ff]",
  md: "w-[130px] h-[50px] bg-[#ff5353]",
  modal: {
    white: "w-[130px] h-[55px] bg-[#ffffff]",
    blue: "w-[130px] h-[55px] bg-[#0d99ff]",
    red: "w-[130px] h-[55px] bg-[#ff5353]",
    green: "w-[130px] h-[55px] bg-[#35cc00]",
  },
};

interface buttonProps {
  children: ReactNode;
  buttonStyles: string;
}

const Button = ({ children, buttonStyles }: buttonProps) => {
  return (
    <button className={`${buttonStyles} rounded-[15px] shadow-md`}>
      {children}
    </button>
  );
};

export default Button;
