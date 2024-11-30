/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockNoteEditor, BlockNoteSchema, defaultBlockSpecs, insertOrUpdateBlock } from '@blocknote/core';
import { FaYoutube } from 'react-icons/fa';
import { Youtube } from './youtube';

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    youtube: Youtube,
  },
});

// export type TSchema = BlockNoteEditor<Record<string, BlockConfig>, InlineContentSchema, StyleSchema>;

export const insertYoutube = (editor: typeof schema.BlockNoteEditor) => ({
  title: 'Youtube',
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: 'youtube',
    });
  },
  aliases: ['youtube'],
  group: 'Others',
  icon: <FaYoutube />,
});

export async function saveToStorage(jsonBlocks: typeof schema.BlockNoteEditor) {
  localStorage.setItem('editorContent', JSON.stringify(jsonBlocks));
}

export async function loadFromStorage() {
  const storageString = localStorage.getItem('editorContent');
  return storageString && storageString !== 'undefined'
    ? (JSON.parse(storageString) as typeof schema.BlockNoteEditor)
    : undefined;
}

export const removeEditorContent = () => {
  localStorage.removeItem('editorContent');
};

export const parseInitialContent = (value?: string | undefined) => {
  try {
    return value ? JSON.parse(value) : undefined;
  } catch {
    return undefined;
  }
};

export const toHTML = async (blocks: any, schema = null) =>
  BlockNoteEditor.create({
    initialContent: blocks,
    ...(schema ? { schema } : {}),
  }).blocksToHTMLLossy(blocks);
