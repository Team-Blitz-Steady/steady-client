"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
  CheckCircledIcon,
  Cross2Icon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";

interface ToastProps {
  role: "inform" | "verify" | "warn" | "alert";
  message: string | ReactNode;
}

const Toast = ({ role, message }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  const handleCloseToast = () => {
    setVisible(false);
  };

  const toastColor = () => {
    switch (role) {
      case "inform":
        return "blue";
      case "verify":
        return "green";
      case "warn":
        return "yellow";
      case "alert":
        return "red";
    }
  };
  return (
    <Callout.Root
      className={`absolute right-0 top-0 ml-auto flex max-w-lg flex-row items-center justify-between ${
        visible ? " " : "hidden"
      } translate-x-full animate-toast-appear transition-transform duration-300
      ease-in-out`}
      color={toastColor()}
      variant={"soft"}
    >
      <div className={"flex gap-10"}>
        <Callout.Icon>
          {(() => {
            switch (role) {
              case "inform":
                return <InfoCircledIcon />;
              case "verify":
                return <CheckCircledIcon />;
              case "warn":
                return <ExclamationTriangleIcon />;
              case "alert":
                return <CrossCircledIcon />;
              default:
                return <InfoCircledIcon />;
            }
          })()}
        </Callout.Icon>
        <Callout.Text>{message}</Callout.Text>
      </div>
      <Cross2Icon
        className={"cursor-pointer"}
        onClick={() => handleCloseToast()}
      />
    </Callout.Root>
  );
};

export default Toast;
