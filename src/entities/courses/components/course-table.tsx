import { TCourseData } from '@/entities';
import { getDMY } from '@/shared/libs';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui';
import { TCourseTableProps } from './types';

export const CourseTableUI: FC<TCourseTableProps> = ({ data, onDelete }) => {
  const navigate = useNavigate();

  const handleRedirectToLesson = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    course: TCourseData,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/course/${course.id}/lesson`);
  };

  const handleEdit = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    courseId: TCourseData['id'],
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/course/update/${courseId}`);
  };

  const handleDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    courseId: TCourseData['id'],
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(courseId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Пройдено (%)</TableHead>
          <TableHead>Теги</TableHead>
          <TableHead>Создано</TableHead>
          <TableHead>Обновлено</TableHead>
          <TableHead className="text-end">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((course) => (
          <TableRow
            key={course.id}
            onClick={(e) => handleRedirectToLesson(e, course)}
            className="cursor-pointer"
          >
            <TableCell>{course.title}</TableCell>
            <TableCell>{course.finishedPercentage}</TableCell>
            <TableCell>{course.tags.join(', ')}</TableCell>
            <TableCell>{getDMY(course.updatedAt)}</TableCell>
            <TableCell>{getDMY(course.createdAt)}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-4">
                <PencilIcon
                  onClick={(e) => handleEdit(e, course.id)}
                  className="cursor-pointer text-gray-500 hover:text-primary"
                />
                <Trash2Icon
                  onClick={(e) => handleDelete(e, course.id)}
                  className="cursor-pointer text-gray-500 hover:text-red-500"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
