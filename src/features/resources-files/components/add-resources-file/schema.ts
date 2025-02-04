import { MAX_FILE_SIZE_MB } from '@constants';
import { z } from 'zod';

const wordWhiteList = [
  'application/msword',
  'application/x-iwork-pages-sffpages',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const fileSchema = z.custom<FileList>().refine((files) => files?.length >= 1, 'File is required.');

const wordSchema = fileSchema
  .refine((files) => wordWhiteList.includes(files?.[0]?.type), 'Only .doc, .pages or .docx formats are supported.')
  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE_MB, 'File size must be less than 50MB.');

const pdfSchema = fileSchema
  .refine((files) => files?.[0]?.type === 'application/pdf', 'Only .pdf formats are supported.')
  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE_MB, 'File size must be less than 50MB.');

export const AddResourcesFileSchema = z
  .object({
    title: z.string(),
    word: wordSchema.optional(),
    pdf: pdfSchema.optional(),
  })
  .refine((data) => data.word || data.pdf, {
    message: 'Either word or pdf file must be provided.',
    path: ['word', 'pdf'],
  });
