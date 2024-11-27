import { FC } from 'react';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui';
import { getDMY } from '@libs';
import { TLessonIdData, type TLessonIdTableProps } from './types';

export const LessonByIdTableUI: FC<TLessonIdTableProps> = ({
  data,
  onEdit,
  onDelete,
  onPreview,
}) => {
  const handleDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  };
  const handleUpdate = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    lesson: TLessonIdData,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(lesson);
  };

  const handleOpenPreview = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    lesson: TLessonIdData,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onPreview(lesson);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Создано</TableHead>
          <TableHead>Обновлено</TableHead>
          <TableHead className="text-end">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((lesson) => (
          <TableRow
            key={lesson.id}
            className="cursor-pointer"
            onClick={(e) => handleOpenPreview(e, lesson)}
          >
            <TableCell>{lesson.name}</TableCell>
            <TableCell>{lesson.type}</TableCell>
            <TableCell>{lesson.status}</TableCell>
            <TableCell>{getDMY(lesson.updatedAt)}</TableCell>
            <TableCell>{getDMY(lesson.createdAt)}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-4">
                <PencilIcon
                  onClick={(e) => handleUpdate(e, lesson)}
                  className="cursor-pointer text-gray-500 hover:text-primary"
                />
                <Trash2Icon
                  onClick={(e) => handleDelete(e, lesson.id)}
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
