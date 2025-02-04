type EmptyValue = null | undefined | '' | [] | { [key: string]: never };

export function removeEmpty<T>(data: T): T | undefined {
  if (Array.isArray(data)) {
    const cleanedArray = data.map((item) => removeEmpty(item)).filter((item) => !isValueEmpty(item));
    return cleanedArray as T;
  }

  if (typeof data === 'object' && data !== null) {
    const cleanedObj = Object.entries(data).reduce((acc, [key, value]) => {
      const cleanedValue = removeEmpty(value);
      return isValueEmpty(cleanedValue) ? acc : { ...acc, [key]: cleanedValue };
    }, {} as Partial<T>);
    return cleanedObj as T;
  }

  return isValueEmpty(data) ? undefined : data;
}

export function isValueEmpty(value: unknown): value is EmptyValue {
  if (value === null || value === undefined) return true;
  if (value === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
}
