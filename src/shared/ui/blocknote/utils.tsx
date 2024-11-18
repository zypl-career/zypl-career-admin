/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockNoteSchema, insertOrUpdateBlock, defaultBlockSpecs, BlockNoteEditor, PartialBlock } from "@blocknote/core";
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
  group: "Others",
  icon: <FaYoutube />,
});

export async function saveToStorage(jsonBlocks: typeof schema.BlockNoteEditor["document"]) {
  localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
}
 
export async function loadFromStorage() {
  const storageString = localStorage.getItem("editorContent");
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}
 

export const toHTML = async (blocks: any, schema = null) => BlockNoteEditor.create({
  initialContent: blocks,
  ...(schema ? { schema } : {})
  
}).blocksToHTMLLossy(blocks);
