import { getGender } from '@libs';
import { FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui';
import { TUserTableProps } from './types';

export const UserFastTable: FC<TUserTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Пол</TableHead>
          <TableHead>Регион</TableHead>
          <TableHead>Возраст</TableHead>
          <TableHead>Дата</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.reverse().map((user, idx) => (
          <TableRow key={idx}>
            <TableCell>{getGender(user.gender)}</TableCell>
            <TableCell>{user.district}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
