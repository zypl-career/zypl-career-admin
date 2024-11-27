"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui";

type ISelectFieldProps<T> = {
  value: string;
  options: T[];
  printType: keyof T;
  valueType: keyof T;
  placeholder?: string;
  onChange: (value: string) => void;
};

export const SelectField = <T,>({
  options,
  value,
  valueType,
  printType,
  placeholder = "Выберите элемент",
  onChange,
}: ISelectFieldProps<T>) => (
  <Select onValueChange={onChange} defaultValue={String(value)}>
    <SelectTrigger>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options &&
        options.map((status, idx) => (
          <SelectItem key={idx} value={String(status[valueType])}>
            {String(status[printType])}
          </SelectItem>
        ))}
    </SelectContent>
  </Select>
);
