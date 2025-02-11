import { FC } from 'react';
import { DropFile, FormControl, FormField, FormItem, FormMessage, Input, Textarea } from '@ui';
import { TAddVideoGuideProps } from './types';

export const AddVideoGuide: FC<TAddVideoGuideProps> = ({ control }) => {
  return (
    <section>
      <header className="mb-1">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Заголовок" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </header>
      <main className="flex w-full items-center justify-between rounded-lg bg-white p-5 shadow-md">
        <FormField
          control={control}
          name="generalInfo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Что-то общее" {...field} className="resize-x" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="image"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormControl>
                <DropFile onChange={onChange} whiteListTypeFile={['video/mp4']} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </main>
    </section>
  );
};
