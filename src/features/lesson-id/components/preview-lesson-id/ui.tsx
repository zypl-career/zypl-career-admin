import { cn } from '@/shared/libs';
import { FC, useEffect, useState } from 'react';
import { Modal, Spinner } from '@ui';
import { useLessonById } from '../../services';
import { TPreviewLessonProps } from './types';

export const PreviewLesson: FC<TPreviewLessonProps> = ({ data, open, setOpen }) => {
  const [isResourceLoading, setIsResourceLoading] = useState(true);
  const { data: lessonData } = useLessonById(data?.id || '');

  useEffect(() => {
    setIsResourceLoading(open);
  }, [open]);

  return (
    <Modal setToggle={setOpen} toggle={open} className="min-h-[90%]">
      {isResourceLoading && (
        <div className="flex items-center justify-center">
          <Spinner className="size-6" />
        </div>
      )}
      <iframe
        src={
          lessonData?.description === 'empty'
            ? lessonData?.resource
            : lessonData?.description.replace('/watch?v=', '/embed/')
        }
        allowFullScreen
        width="100%"
        height="100%"
        onLoad={() => setIsResourceLoading(false)}
        className={cn('w-full h-full rounded-2xl', {
          hidden: isResourceLoading,
        })}
      />
    </Modal>
  );
};
