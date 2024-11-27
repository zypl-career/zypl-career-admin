import { useCallback, useMemo, useState } from 'react';
import { cn } from '@libs';
import { Search } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
  Input,
  Spinner,
} from '@ui';

type TSearchSelectProps<T> = {
  onChange: (value: string) => void;
  onSelect: (value: T) => void;
  value: string;
  className?: string;
  data?: T[];
  filteredData?: T[];
  labelField?: keyof T;
  valueField?: keyof T;
  placeholder?: string;
  loading?: boolean;
};

export const Combobox = <T,>({
  className,
  value,
  onChange,
  onSelect,
  data,
  filteredData = [],
  loading,
  labelField = 'label' as keyof T,
  valueField = 'value' as keyof T,
  placeholder = 'Поиск',
}: TSearchSelectProps<T>) => {
  const [open, setOpen] = useState<boolean>(true);

  const mappedData = useMemo(
    () =>
      filteredData?.length > 0
        ? filteredData?.filter((f) =>
            String(f[valueField])
              ?.toLocaleLowerCase()
              ?.includes(value?.toLocaleLowerCase()),
          )
        : data,
    [filteredData, data, valueField, value],
  );

  const lenData = useMemo(() => mappedData?.length || 0, [mappedData]);

  const handleChange = useCallback(
    (value: string) => {
      if (value.length > 0) {
        setOpen(true);
      }
      onChange(value);
    },
    [onChange],
  );

  return (
    <div className="relative w-full">
      <Input
        className={cn('rounded-xl p-4', className)}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
      />
      <div className="absolute right-0 top-0 flex h-full items-center px-3 py-1 hover:bg-transparent">
        <Search className="size-4 text-white" aria-hidden="true" />
        <span className="sr-only">Поиск</span>
      </div>
      <Command
        shouldFilter={false}
        className={cn(
          'transition-all duration-300',
          open ? 'opacity-100 visible' : 'opacity-0 invisible',
        )}
      >
        <CommandList
          className={cn(
            'absolute top-16 z-30 max-h-60 w-full overflow-auto rounded-xl bg-white py-2.5',
          )}
        >
          {loading ? (
            <Spinner />
          ) : !lenData ? (
            <CommandEmpty>Нет результатов</CommandEmpty>
          ) : (
            mappedData?.map((item, i) => (
              <CommandItem
                key={(item[labelField] as string) || i}
                className="cursor-pointer select-none px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                onSelect={() => onSelect(item)}
                value={item[valueField] as string}
              >
                <span>
                  {labelField ? (item[labelField] as React.ReactNode) : null}
                </span>
              </CommandItem>
            ))
          )}
        </CommandList>
      </Command>
    </div>
  );
};
