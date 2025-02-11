import { TArticleData } from '@entities';

export type Description = {
  id: string;
  type: string;
  props: Props;
  children: any[];
};

export type Props = {
  backgroundColor: string;
  name: string;
  url: string;
  caption: string;
};

export type ResourcesSeekerFiles = Partial<
  Omit<TArticleData, 'description'> & {
    description?: Description[] | undefined;
  }
>;
