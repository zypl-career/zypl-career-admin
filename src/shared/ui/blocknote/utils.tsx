/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockNoteSchema, insertOrUpdateBlock, defaultBlockSpecs, BlockNoteEditor } from "@blocknote/core";
import { FaYoutube } from "react-icons/fa";
import { Youtube } from "./youtube";

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    youtube: Youtube,
  },
});

export const insertYoutube = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Youtube",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "youtube",
    });
  },
  aliases: ['youtube'],
  group: "Media",
  icon: <FaYoutube />,
});

export const toHTML = async (blocks: any, schema = null) => BlockNoteEditor.create({
  initialContent: blocks,
  ...(schema ? { schema } : {})
  
}).blocksToHTMLLossy(blocks);
