import { Trash2Icon } from 'lucide-react';
import { FC } from 'react';
import { Badge, Button, TableCell, TableRow } from '@ui';
import { wordWhiteListFormat } from './constants';
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
          {row?.description
            ?.filter((item) => wordWhiteListFormat.some((format) => item.props.name.includes(format)))
            .map((item) => (
              <Badge variant="outline" key={item.props?.url}>
                <a href={item.props?.url} target="_blank" rel="noopener">
                  {item?.props?.name}
                </a>
              </Badge>
            ))}
        </TableCell>
        <TableCell>
          {row?.description
            ?.filter((item) => item.props.name.includes('.pdf'))
            .map((item) => (
              <Badge variant="outline">
                <a href={item.props?.url} target="_blank" rel="noopener">
                  {item?.props?.name}
                </a>
              </Badge>
            ))}
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
