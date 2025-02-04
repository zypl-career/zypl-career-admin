import { cn } from '@libs';
import { ChangeEvent, DragEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { BlurImage, Button, toast } from '@ui';
import type { TDropFileProps, TPreview } from './types';

const whiteListTypeFile = ['image', 'image/jpeg', 'image/png', 'gif', 'video/mp4'];

export const DropFile: FC<TDropFileProps> = ({ preview, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewFile, setPreviewFile] = useState<Partial<TPreview>>({
    preview,
  });

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement> & ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const { files } = e?.dataTransfer || e.target;
      const [file] = files;

      const isFailedType = whiteListTypeFile.includes(file.type);

      if (!isFailedType) {
        toast({ title: 'Неверный формат файла', variant: 'error' });
        return;
      }

      const reader = new FileReader();
      onChange(file);
      reader.readAsDataURL(file);

      reader.onload = (evt) => {
        if (file.type.includes('video')) {
          setPreviewFile(file);
          return;
        }

        setPreviewFile((prev) => ({
          ...prev,
          preview: evt?.target?.result,
          name: file.name,
          size: file.size,
          type: file.type,
        }));
      };
    },
    [onChange],
  );

  useEffect(() => {
    if (preview && !previewFile.name) {
      setPreviewFile((prev) => ({ ...prev, preview }));
    }
  }, [preview, previewFile.name]);

  return (
    <>
      <div
        className={cn(
          'flex flex-col justify-center items-center relative rounded-lg py-6 px-1 cursor-pointer hover:opacity-50 transition',
          {
            'border-dashed border-primary-100 border-2': !previewFile?.preview,
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
          accept="image/png, image/gif, image/jpeg, video/*"
          hidden
        />
        {!previewFile.size ? (
          <>
            <h4 className="mb-1 text-center">Перетащите файл сюда или выберите его</h4>
            <Button variant="ghost">Выбрать файл</Button>
          </>
        ) : (
          <>
            {previewFile.type?.includes('image') ? (
              <BlurImage
                isSkeleton
                src={previewFile?.preview?.toString()}
                alt="preview"
                className="w-full rounded-md object-contain"
              />
            ) : null}
            {previewFile.type?.includes('video') ? (
              <>
                <video controls width="100%" style={{ maxWidth: '600px' }} key={previewFile.name}>
                  <source src={URL.createObjectURL(previewFile as Blob)} type={previewFile.type} />
                  Your browser does not support the video tag.
                </video>
                <p>
                  {previewFile.name} - {Math.round((previewFile?.size ?? 0) / 1024 / 1024)}MB
                </p>
              </>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};
