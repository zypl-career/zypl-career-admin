import { getGender } from '@libs';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui';
import { TUserTableProps } from './types';

export const UserTableUI: FC<TUserTableProps> = ({ data, onDelete, onEdit }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ФИО</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Роль</TableHead>
          <TableHead>Пол</TableHead>
          <TableHead>Регион</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              {user.surname} {user.name} {user.patronymic}
            </TableCell>
            <TableCell className="font-medium">
              <Link
                to={`mailto:${user.email}`}
                rel="noopener noreferrer"
                target="_blank"
                className="hover:text-primary"
              >
                {user.email}
              </Link>
            </TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{getGender(user.gender)}</TableCell>
            <TableCell>{user.school}</TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <PencilIcon onClick={() => onEdit(user)} className="cursor-pointer text-gray-500" />
                <Trash2Icon onClick={() => onDelete(user.id)} className="cursor-pointer text-gray-500" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
