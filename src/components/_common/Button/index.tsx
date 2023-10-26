import type { PropsWithChildren } from "react";
import { clsx } from "clsx";

export const buttonSize = {
  xl: "w-165 h-50 rounded-6",
  lg: "w-140 h-50",
  md: "w-115 h-50",
  sm: "w-90 h-35",
};

const Button = ({
  children,
  className,
}: PropsWithChildren<{ className: string }>) => {
  return (
    <button className={clsx("rounded-15 shadow-md", className)}>
      {children}
    </button>
  );
};

export default Button;
