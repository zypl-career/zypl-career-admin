import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

export const setFieldError = <T extends FieldValues>(
  state: UseFormReturn<T>,
) => {
  Object.keys(state.formState.defaultValues || {}).forEach((key) => {
    state.setError(key as Path<T>, {
      type: '',
      message: 'Введите поле',
    });
  });
};
