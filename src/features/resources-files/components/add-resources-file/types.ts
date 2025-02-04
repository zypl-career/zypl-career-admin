import { Control } from 'react-hook-form';
import { z } from 'zod';
import { AddResourcesFileSchema } from './schema';

export type TAddResourcesFile = z.infer<typeof AddResourcesFileSchema>;

export type AddResourcesFileProps = {
  control: Control<TAddResourcesFile, any>;
};
