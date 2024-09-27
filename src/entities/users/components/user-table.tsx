import { FC } from "react"
import { PencilIcon, Trash2Icon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui"
import { getGender } from "@libs"
import { TUserTableProps } from "./types"

export const UserTableUI: FC<TUserTableProps> = ({ data, onDelete, onEdit }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ФИО</TableHead>
          <TableHead>Роль</TableHead>
          <TableHead>Пол</TableHead>
          <TableHead>Регион</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.surname} {user.name} {user.patronymic}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{getGender(user.gender)}</TableCell>
            <TableCell>{user.school}</TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <PencilIcon onClick={() => onEdit(user)} className="text-gray-500 cursor-pointer" />
                <Trash2Icon onClick={() => onDelete(user.id)} className="text-gray-500 cursor-pointer" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
