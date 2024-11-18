import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor, filterSuggestionItems, PartialBlock } from "@blocknote/core";
import { getDefaultReactSlashMenuItems, SuggestionMenuController } from "@blocknote/react";
import { TBlockNoteProps } from "./types";
import { insertYoutube, loadFromStorage, saveToStorage, schema } from "./utils";
import { urlToBase64 } from "@libs";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
 
export const BlockNote: FC<TBlockNoteProps> = ({ editable, value = 'loading', domAttributes, initialContentHTML, onChange, onChangeHTML }) => {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >(value === 'loading' ? "loading" : Array.isArray(value) ? value : JSON.parse(value));

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({
      domAttributes: {
        editor: {
          class: 'min-h-dvh bg-transparent',
        },
        ...domAttributes,
      },
      initialContent,
      schema,
      uploadFile: async (file: File) => await URL.createObjectURL(file),
    });
  }, [domAttributes, initialContent]);

  const handleChange = useCallback(async () => {
    if (editor) {
      const updatedBlocks = await Promise.all(
        editor.document.map(async (block) => {
          if (block.type === 'image' && block.props.url) {
            const url = await urlToBase64(block.props.url);
            return {
              ...block,
              props: {
                ...block.props,
                url,
              },
            };
          }
          return block;
        })
      );
      
      saveToStorage(updatedBlocks);
      return updatedBlocks;
    }
  }, [editor]);

  useEffect(() => {
    if (initialContentHTML && editor) {
      editor.tryParseHTMLToBlocks(initialContentHTML)
    }
  }, [editor, initialContentHTML])

  useEffect(() => {
    (async () => {
      const html = await editor?.blocksToHTMLLossy(editor.document);
      if (onChangeHTML && html) {
        onChangeHTML(html);
      }
      if (onChange) {
        const doc = await handleChange();
        onChange(JSON.stringify(doc, null, 2));
      }

    })()
  }, [editor, handleChange, onChange, onChangeHTML])
  
 
  
  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, []);
 
 
  if (editor === undefined) {
    return "Loading content...";
  }
 
  return (
    <BlockNoteView
      theme="light"
      editable={editable}
      editor={editor}
      onChange={() => {
        saveToStorage(editor.document)
        handleChange()
      }}
    >
    <SuggestionMenuController
        triggerCharacter="/"
        getItems={async (query) =>
          filterSuggestionItems(
            [...getDefaultReactSlashMenuItems(editor), insertYoutube(editor)],
            query
          )
        }
      />
    </BlockNoteView>
  );
}
 