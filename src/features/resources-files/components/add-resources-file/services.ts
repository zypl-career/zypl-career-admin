import { apiService } from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TAddResourcesFile } from './types';

export const useAddResourcesFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['resources-seeker-files'],
    mutationFn: (form: TAddResourcesFile) => {
      const description = [
        ...(form.word?.[0].name
          ? [
              {
                children: [],
                type: 'file',
                id: crypto.randomUUID(),
                props: {
                  backgroundColor: 'default',
                  caption: '',
                  name: form.word?.[0].name,
                  url: form.word?.[0] ? URL.createObjectURL(form.word[0]) : '',
                },
              },
            ]
          : []),
        ...(form.pdf?.[0]?.name
          ? [
              {
                children: [],
                type: 'file',
                id: crypto.randomUUID(),
                props: {
                  backgroundColor: 'default',
                  caption: '',
                  name: form.pdf?.[0].name,
                  url: form.pdf?.[0] ? URL.createObjectURL(form.pdf[0]) : '',
                },
              },
            ]
          : []),
      ];

      const fd = new FormData();

      fd.append('title', form.title);
      fd.append('description', JSON.stringify(description));
      fd.append('image', new File([], 'empty.txt'));
      fd.append('type', 'student');
      fd.append('minutesRead', '0');
      fd.append('generalInfo', 'empty');
      fd.append('hashtags', '0');
      fd.append('sections', 'Resources for Job Seekers');

      return apiService
        .post('/article/create', fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          Object.keys(form).forEach((key) => fd.delete(key));
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['resources-seeker-files'] });
    },
  });
};
