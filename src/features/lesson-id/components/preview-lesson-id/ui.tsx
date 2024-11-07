import {Modal, Spinner} from "@ui";
import {FC} from "react";
import {TPreviewLessonProps} from "./types";
import {useLessonById} from "../../services";

export const PreviewLesson: FC<TPreviewLessonProps> = ({
  data,
  open,
  setOpen,
}) => {
  console.log(data);
  const {data: lessonData, isLoading: lessonLoading} = useLessonById(
    data?.id || ""
  );

  return (
    <Modal setToggle={setOpen} toggle={open} className="min-h-[90%]">
      {lessonLoading ? (
        <Spinner />
      ) : (
        <iframe src={lessonData?.resource} width="100%" height="100%" />
      )}
    </Modal>
  );
};
