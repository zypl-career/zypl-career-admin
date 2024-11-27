import { Modal, Spinner } from "@ui";
import { FC, useEffect, useState } from "react";
import { TPreviewLessonProps } from "./types";
import { useLessonById } from "../../services";
import { cn } from "@/shared/libs";

export const PreviewLesson: FC<TPreviewLessonProps> = ({
  data,
  open,
  setOpen,
}) => {
  const [isResourceLoading, setIsResourceLoading] = useState(true);
  const { data: lessonData } = useLessonById(data?.id || "");

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
        src={lessonData?.resource}
        width="100%"
        height="100%"
        onLoad={() => setIsResourceLoading(false)}
        className={cn("w-full h-full rounded-2xl", {
          hidden: isResourceLoading,
        })}
      />
    </Modal>
  );
};
