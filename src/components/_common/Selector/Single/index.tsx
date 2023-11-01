import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { SelectItem as SelectItemProps } from "@/components/_common/Selector/types/selectItem";

interface SingleSelectorProps {
  items: SelectItemProps[];
  initialLabel?: string;
  className?: string;
}

const SingleSelector = ({
  items,
  initialLabel,
  className,
}: SingleSelectorProps) => {
  return (
    <Select>
      <SelectTrigger className={cn(className)}>
        <SelectValue
          className={cn("font-semibold")}
          placeholder={initialLabel}
        />
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
