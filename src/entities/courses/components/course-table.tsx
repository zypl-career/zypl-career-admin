import { FC } from "react"
import { PencilIcon, Trash2Icon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui"
import { TCourseTableProps } from "./types"
import { useNavigate } from "react-router-dom"
import { getDMY } from "@/shared/libs"

export const CourseTableUI: FC<TCourseTableProps> = ({ data, onDelete }) => {
  const navigate = useNavigate()
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
          <TableRow key={course.id}>
            <TableCell>{course.title}</TableCell>
            <TableCell>{course.finishedPercentage}</TableCell>
            <TableCell>{course.tags.join(', ')}</TableCell>
            <TableCell>{getDMY(course.updatedAt)}</TableCell>
            <TableCell>{getDMY(course.createdAt)}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-4">
                <PencilIcon onClick={() => navigate(`/course/update/${course.id}`)} className="text-gray-500 cursor-pointer" />
                <Trash2Icon onClick={() => onDelete(course.id)} className="text-gray-500 cursor-pointer" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
