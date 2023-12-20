import type { PropsWithChildren } from "react";
import Dropdown from "@/components/_common/Dropdown";

interface SteadyFilterProps {
  options: {
    label: string;
    linkTo: string;
  }[];
  title: string;
}

const SteadyFilter = ({
  options,
  title,
  children,
}: PropsWithChildren<SteadyFilterProps>) => {
  return (
    <Dropdown options={options}>
      <div className="flex gap-10 text-16 text-st-black">
        {title}
        {children}
      </div>
    </Dropdown>
  );
};

export default SteadyFilter;
