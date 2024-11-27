import { TCourseData } from '../types';

export type TCourseTableProps = {
  data: TCourseData[];
  onDelete: (id: TCourseData['id']) => void;
};
