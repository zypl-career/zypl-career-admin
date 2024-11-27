import { ChangeEvent, DragEvent, FC, useEffect, useRef, useState } from "react";
import { BlurImage, Button } from "@ui";
import { cn } from "@libs";
import type { TDropFileProps, TPreview } from "./types";

const whiteListTypeFile = ["image", "image/jpeg", "image/png", "gif"];

export const DropFile: FC<TDropFileProps> = ({ preview, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewFile, setPreviewFile] = useState<Partial<TPreview>>({
    preview,
  });

  const handleDrop = (
    e: DragEvent<HTMLDivElement> & ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const { files } = e?.dataTransfer || e.target;
    const [file] = files;

    const isFailedType = whiteListTypeFile.includes(file.type);

    if (!isFailedType) {
      // toast.warning('Данный формат не поддерживается');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (evt) => {
      setPreviewFile((prev) => ({
        ...prev,
        preview: evt?.target?.result,
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      onChange(file);
    };
  };

  useEffect(() => {
    setPreviewFile((prev) => ({ ...prev, preview }));
  }, [preview]);

  return (
    <>
      <div
        className={cn(
          "flex flex-col justify-center items-center relative rounded-lg py-6 px-1 cursor-pointer hover:opacity-50 transition",
          {
            "border-dashed border-primary-100 border-2": !previewFile?.preview,
          },
        )}
        onClick={() => inputRef.current?.click()}
        onDragStart={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleDrop}
          accept="image/png, image/gif, image/jpeg"
          hidden
        />
        {previewFile?.preview ? (
          <BlurImage
            isSkeleton
            src={previewFile?.preview?.toString()}
            alt="preview"
            className="object-contain rounded-md w-full"
          />
        ) : (
          <>
            <h4 className="mb-1 text-center">
              Перетащите файл сюда или выберите его
            </h4>
            <Button variant="ghost">Выбрать файл</Button>
          </>
        )}
      </div>
    </>
  );
};
