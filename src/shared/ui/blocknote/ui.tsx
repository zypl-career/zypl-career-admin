import {FC, useCallback, useState} from "react";
import {BlockNoteView} from "@blocknote/shadcn";
import {
  filterSuggestionItems,
  PartialBlock,
} from "@blocknote/core";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import {TBlockNoteProps} from "./types";
import {insertYoutube, schema} from "./utils";
import {urlToBase64} from "@libs";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";

export const BlockNote: FC<TBlockNoteProps> = ({
  editable = true,
  value,
  onChange,
}) => {
  const initialBlocks = value ? JSON.parse(value) : undefined;
  const [blocks, setBlocks] = useState<PartialBlock[]>(initialBlocks);
  const editor = useCreateBlockNote({
    initialContent: blocks,
    schema,
    uploadFile: async (file) => URL.createObjectURL(file),
  });

  const handleChange = useCallback(async () => {
    if (editor && editable) {
      const updatedBlocks = (await Promise.all(
        editor?.document?.map(async (block) => {
          if (block?.type === "image" && block?.props?.url) {
            const url = await urlToBase64(block?.props?.url);
            return {
              ...block,
              props: {
                ...(block?.props ? block?.props : {}),
                url,
              },
            };
          }
          return block;
        })
      )) as PartialBlock[];

      setBlocks(updatedBlocks);
      if (onChange) {
        onChange(JSON.stringify(updatedBlocks));
      }
      return updatedBlocks;
    }
  }, [editable, editor, onChange]);

  if (editor === undefined) {
    return "Loading content...";
  }

  return (
    <BlockNoteView
      theme="light"
      editable={editable}
      editor={editor}
      onChange={handleChange}
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
};
