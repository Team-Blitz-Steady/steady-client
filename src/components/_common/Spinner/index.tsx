import { clsx } from "clsx";

interface SpinnerProps {
  size: "small" | "medium" | "large";
}

const spinnerSizeClasses = {
  small: "w-24 h-24",
  medium: "w-36 h-36",
  large: "w-48 h-48",
};

const Spinner = ({ size }: SpinnerProps) => {
  const sizeClassName = spinnerSizeClasses[size] || "w-12 h-12";

  return (
    <div
      className={`inline-block ${sizeClassName} animate-spin rounded-full border-5 
      ${clsx("border-b-st-primary", "border-st-gray-100")}`}
    ></div>
  );
};

export default Spinner;
