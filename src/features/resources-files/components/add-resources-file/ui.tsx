import { FC } from 'react';
import { FormControl, FormField, FormItem, FormMessage, Input, TableCell, TableRow } from '@ui';
import { AddResourcesFileProps } from './types';

export const AddResourcesFile: FC<AddResourcesFileProps> = ({ control }) => {
  return (
    <TableRow>
      <TableCell>
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Название" {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={control}
          name="word"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Word"
                  accept="application/msword, application/x-iwork-pages-sffpages, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) => field.onChange(event.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell colSpan={2}>
        <FormField
          control={control}
          name="pdf"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  placeholder="PDF"
                  accept="application/pdf"
                  onChange={(event) => field.onChange(event.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
    </TableRow>
  );
};
