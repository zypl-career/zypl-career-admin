import { type TArticleData } from '@entities';
import type { ResourcesSeekerFiles } from '../../types';

export type TableResourcesFileProps = {
  data: ResourcesSeekerFiles[];
  onDelete: (id: TArticleData['id']) => void;
};
