import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_common/Selector/core/select";
import type { SelectItem as SelectItemProps } from "@/components/_common/Selector/types/selectItem";

interface SingleSelectorProps {
  items: SelectItemProps[];
}

const SingleSelector = ({ items }: SingleSelectorProps) => {
  return (
    <Select>
      <SelectTrigger className={"w-180"}>
        <SelectValue placeholder={"Select a value"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map(({ value, label }) => (
            <SelectItem
              key={value}
              value={value}
            >
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SingleSelector;
