interface SpinnerProps {
  size: "small" | "medium" | "large";
}

const Spinner = ({ size }: SpinnerProps) => {
  const spinnerSizeClasses = {
    xSmall: "w-4 h-4",
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  const sizeClass = spinnerSizeClasses[size] || "w-12 h-12";

  return (
    <div
      className={`border-4 border-gray-400 border-b-steady-main-color border-solid rounded-full inline-block animate-spin ${sizeClass}`}
    ></div>
  );
};

export default Spinner;
