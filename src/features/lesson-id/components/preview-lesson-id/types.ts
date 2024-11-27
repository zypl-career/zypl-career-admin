import { TLessonIdData } from '@/entities';

export type TPreviewLessonProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  data: Partial<TLessonIdData>;
};
