export function convertNumbersToString(data: any): any {
  if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      if (typeof data[key] === 'number') {
        data[key] = String(data[key]);
      } else if (typeof data[key] === 'object') {
        data[key] = convertNumbersToString(data[key]);
      }
    }
  }
  return data;
}
