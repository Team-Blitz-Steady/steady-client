import "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "@/services/types";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ErrorResponse>;
  }
}
