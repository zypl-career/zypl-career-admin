export type TBlockNoteProps = {
  initialContent?: string;
  initialContentHTML?: string;
  onChange?: (value: string) => void;
  onChangeHTML?: (value: string) => void;
  editable?: boolean;
}