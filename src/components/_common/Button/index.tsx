import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";

export const buttonSize = {
  xl: "w-165 h-50 rounded-6 text-18",
  lg: "w-140 h-50 text-18",
  md: "w-115 h-50 text-18",
  sm: "w-90 h-35 text-15",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
}

const Button = ({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={clsx("rounded-15 text-center font-bold shadow-md", className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
