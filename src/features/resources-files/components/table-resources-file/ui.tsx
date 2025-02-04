import { Trash2Icon } from 'lucide-react';
import { FC } from 'react';
import { Badge, Button, TableCell, TableRow } from '@ui';
import type { TableResourcesFileProps } from './types';

export const TableResourcesFile: FC<TableResourcesFileProps> = ({ data, onDelete }) => {
  return data.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center">
        Нет данных
      </TableCell>
    </TableRow>
  ) : (
    data?.map((row, idx) => (
      <TableRow key={idx}>
        <TableCell>{row.title}</TableCell>
        <TableCell>
          {row?.description?.[0].props?.url ? (
            <Badge variant="outline">
              <a href={row?.description?.[0].props?.url} target="_blank" rel="noopener">
                {row?.description?.[0]?.props?.name}
              </a>
            </Badge>
          ) : (
            '–'
          )}
        </TableCell>
        <TableCell>
          {row?.description?.[1].props?.url ? (
            <Badge variant="outline">
              <a href={row?.description?.[1].props?.url} target="_blank" rel="noopener">
                {row?.description?.[1]?.props?.name}
              </a>
            </Badge>
          ) : (
            '–'
          )}
        </TableCell>
        <TableCell>
          <Button variant="ghost" type="button" className="hover:text-red-500" onClick={() => onDelete(row?.id ?? '')}>
            <Trash2Icon />
          </Button>
        </TableCell>
      </TableRow>
    ))
  );
};
