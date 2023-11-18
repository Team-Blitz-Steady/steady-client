import type { DependencyList } from "react";
import { useEffect, useRef } from "react";

export const useScrollTo = <T extends HTMLElement = HTMLElement>(
  options: ScrollToOptions,
  deps: DependencyList,
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current?.scrollTo(options);
    // eslint-disable-next-line no-unused-vars
  }, [...deps]);

  return ref;
};
