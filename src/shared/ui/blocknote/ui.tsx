import { FC, useCallback, useEffect, useState } from "react";
import { BlockNoteView } from "@blocknote/shadcn";
import { SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";

import {
  filterSuggestionItems,
  getDefaultSlashMenuItems,
  PartialBlock,
} from "@blocknote/core";
import { urlToBase64 } from "@libs";

import { insertYoutube, schema } from "./utils";
import type { TBlockNoteProps } from "./types";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "@blocknote/shadcn/style.css";


export const BlockNote: FC<TBlockNoteProps> = ({
  initialContent,
  initialContentHTML,
  editable,
  onChangeHTML,
  onChange
}) => {
  const initialBlocks = initialContent ? JSON.parse(initialContent) : undefined;
  const [blocks, setBlocks] = useState<PartialBlock[]>(initialBlocks);
  const editor = useCreateBlockNote({
    domAttributes: {
      editor: {
        class: 'min-h-dvh',
      },
    },
    initialContent: blocks,
    uploadFile: async (file: File) => await URL.createObjectURL(file),
    schema,
  });

  const handleChange = useCallback(async () => {
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

    setBlocks(updatedBlocks as PartialBlock[]);
  }, [editor]);

  useEffect(() => {
    if (initialContentHTML) {
      editor.tryParseHTMLToBlocks(initialContentHTML)
    }
  }, [editor, initialContentHTML])

  useEffect(() => {
    (async () => {
      const html = await editor.blocksToHTMLLossy(blocks);
      if (onChangeHTML) {
        onChangeHTML(html);
      }
      if (onChange) {
        onChange(JSON.stringify(blocks, null, 2));
      }

    })()
  }, [blocks, editor, onChange, onChangeHTML])
  
  return (
    <>
      <BlockNoteView
        theme="light"
        editor={editor}
        editable={editable}
        onChange={handleChange}
      >
        <SuggestionMenuController
          triggerCharacter="/"
          getItems={async (query) =>
            filterSuggestionItems(
              [...getDefaultSlashMenuItems(editor), insertYoutube(editor)],
              query
            )
          }
        />
      </BlockNoteView>
    </>
  );
};
