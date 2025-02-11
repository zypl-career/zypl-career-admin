import { Control } from 'react-hook-form';
import { z } from 'zod';
import { VideoGuideSchema } from './schema';

export type TVideoGuideSchema = z.infer<typeof VideoGuideSchema>;

export type TAddVideoGuideProps = {
  control: Control<TVideoGuideSchema>;
};
