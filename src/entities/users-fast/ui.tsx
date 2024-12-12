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
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.createdAt}>
            <TableCell>{getGender(user.gender)}</TableCell>
            <TableCell>{user.district}</TableCell>
            <TableCell>{user.age}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
