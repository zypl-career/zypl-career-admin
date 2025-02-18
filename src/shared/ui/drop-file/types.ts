export type TPreview = {
  preview: string | ArrayBuffer | File | null | undefined;
  name: string;
  size: number;
  type: string;
};

export type TDropFileProps = {
  preview?: string | ArrayBuffer | File | null | undefined;
  link?: string;
  whiteListTypeFile?: string[];
  onChange: (file: File) => void;
  onChangeLink?: (link: string) => void;
};
