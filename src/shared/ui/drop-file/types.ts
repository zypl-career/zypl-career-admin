export type TPreview = {
  preview: string | ArrayBuffer | File | null | undefined;
  name: string;
  size: number;
  type: string;
};

export type TDropFileProps = {
  preview?: string | ArrayBuffer | File | null | undefined;
  onChange: (file: File) => void;
};
