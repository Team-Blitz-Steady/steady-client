import { useState } from "react";
import { Button } from "@/components/_common/Selector/core/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/_common/Selector/core/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/_common/Selector/core/select";

interface SelectorProps {
  type: "single" | "multi";
}

const Selector = ({ type }: SelectorProps) => {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [value, setValue] = useState(false);

  return type === "single" ? (
    <Select>
      <SelectTrigger className={"w-180"}>
        <SelectValue placeholder={"Select a value"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Label</SelectLabel>
          <SelectItem value={"value1"}>Value 1</SelectItem>
          <SelectItem value={"value2"}>Value 2</SelectItem>
          <SelectItem value={"value3"}>Value 3</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={"w-180"}
          variant={"outline"}
        >
          Select a value
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-180">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={value}
          onCheckedChange={setValue}
        >
          Value
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Selector;
