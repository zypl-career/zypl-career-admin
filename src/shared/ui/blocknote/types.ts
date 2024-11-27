import { BlockNoteDOMAttributes } from "@blocknote/core";

export type TBlockNoteProps = {
  domAttributes?: BlockNoteDOMAttributes;
  value?: string;
  initialContentHTML?: string;
  onChange?: (value: string) => void;
  onChangeHTML?: (value: string) => void;
  editable?: boolean;
};
