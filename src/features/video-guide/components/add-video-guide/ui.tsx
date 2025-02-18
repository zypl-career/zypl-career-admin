import { FC } from 'react';
import {
  DropFile,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '@ui';
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
                <Textarea placeholder="Что-то общее" {...field} className="size-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Tabs defaultValue="file">
          <TabsList>
            <TabsTrigger value="file">Файл</TabsTrigger>
            <TabsTrigger value="link">Ссылка</TabsTrigger>
          </TabsList>
          <TabsContent value="file">
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
          </TabsContent>
          <TabsContent value="link">
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="youtube.com/watch" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
      </main>
    </section>
  );
};
