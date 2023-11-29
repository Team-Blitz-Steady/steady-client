"use client";

import { useEffect, useRef, useState } from "react";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { ForwardRefEditor } from "@/components/_common/Editor/ForwardedRefEditor";

const ClientPage = () => {
  const markdown = `A sample post with markdown.
## Inline Highlighting
Sample of inline highlighting \`sum = parseInt(num1) + parseInt(num2)\`
## Code Blocks`;
  const editorRef = useRef<MDXEditorMethods>(null);
  const [html, setHtml] = useState("");

  useEffect(() => {
    document.getElementById("preview")!.innerHTML = html;
  }, [html]);

  return (
    <div>
      <h3>Client Page</h3>
      <ForwardRefEditor
        className={"h-full w-640"}
        contentEditableClassName={"prose"}
        markdown={markdown}
        ref={editorRef}
        onChange={(markdown) => {
          unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(markdown)
            .then((file) => {
              setHtml(String(file.value));
            });
        }}
      />
      <div className={"my-20 text-xl"}>Preview(HTML)</div>
      <div
        id={"preview"}
        className={"prose h-full w-640"}
      ></div>
    </div>
  );
};

export default ClientPage;
