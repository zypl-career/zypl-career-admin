import {FC} from "react";
import {PencilIcon, Trash2Icon} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui";
import { getDMY } from "@libs";
import { type TLessonIdTableProps } from './types';

export const LessonByIdTableUI: FC<TLessonIdTableProps> = ({ data, onEdit, onDelete }) => {
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
          <TableRow key={lesson.id}>
            <TableCell>{lesson.name}</TableCell>
            <TableCell>{lesson.type}</TableCell>
            <TableCell>{lesson.status}</TableCell>
            <TableCell>{getDMY(lesson.updatedAt)}</TableCell>
            <TableCell>{getDMY(lesson.createdAt)}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-4">
                <PencilIcon
                  onClick={() => onEdit(lesson)}
                  className="text-gray-500 hover:text-primary cursor-pointer"
                />
                <Trash2Icon
                  onClick={() => onDelete(lesson.id)}
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
