import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";

export const buttonSize = {
  xl: "w-165 h-50 rounded-6",
  lg: "w-140 h-50",
  md: "w-115 h-50",
  sm: "w-90 h-35",
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
      className={clsx("rounded-15 shadow-md", className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
