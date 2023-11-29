"use client";

// ForwardRefEditor.tsx
// This is the only place InitializedMDXEditor is imported directly.
import { forwardRef } from "react";
import dynamic from "next/dynamic";
import type { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";

const Editor = dynamic(() => import("./InitializedMDXEditor"), {
  // Make sure we turn SSR off
  ssr: false,
});

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const ForwardRefEditor = forwardRef<
  MDXEditorMethods,
  // eslint-disable-next-line no-unused-vars
  MDXEditorProps & { setIsLoaded?: (isLoaded: boolean) => void }
>((props, ref) => {
  const { setIsLoaded, ...rest } = props;
  return (
    <Editor
      {...rest}
      editorRef={ref}
      setIsLoaded={setIsLoaded}
    />
  );
});

// TS complains without the following line
ForwardRefEditor.displayName = "ForwardRefEditor";
