"use client";

// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react";
import { useEffect } from "react";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  ListsToggle,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  Separator,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps & {
    setIsLoaded?: (isLoaded: boolean) => void;
  }) {
  useEffect(() => {
    if (editorRef) {
      props.setIsLoaded?.(true);
    }
  }, [editorRef]);
  return (
    <MDXEditor
      plugins={[
        // Example Plugin Usage
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        markdownShortcutPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            java: "Java",
            js: "JavaScript",
            python: "Python",
            c: "C",
            css: "CSS",
            txt: "text",
          },
        }),
        diffSourcePlugin({
          diffMarkdown: "An older version",
          viewMode: "rich-text",
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                        </>
                      ),
                    },
                  ]}
                />
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
