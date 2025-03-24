import { TSpecialtyTableProps } from '@entities';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui';

export const SpecialtyTableUI: FC<TSpecialtyTableProps> = ({ data, onDelete, onEdit }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Код</TableHead>
          <TableHead>Группа специализации</TableHead>
          <TableHead>Кластер</TableHead>
          <TableHead>Университет</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((specialty) => (
          <TableRow key={specialty.id}>
            <TableCell className="font-medium">{specialty.name}</TableCell>
            <TableCell>{specialty.specialtyCode}</TableCell>
            <TableCell>{specialty.specializationGroup}</TableCell>
            <TableCell>{specialty.clusterName}</TableCell>
            <TableCell>{specialty.universityName}</TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <PencilIcon onClick={() => onEdit(specialty)} className="cursor-pointer text-gray-500" />
                <Trash2Icon onClick={() => onDelete(specialty.id)} className="cursor-pointer text-gray-500" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
