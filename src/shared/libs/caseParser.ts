export const camelToSnake = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => camelToSnake(item));
  }

  const snakeObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`,
      );
      snakeObj[snakeKey] = camelToSnake(obj[key]);
    }
  }
  return snakeObj;
};

export const snakeToCamel = (data: any): any => {
  const convertToCamelCase = (input: any): any => {
    if (Array.isArray(input)) {
      return input.map((item) => convertToCamelCase(item));
    } else if (typeof input === "object" && input !== null) {
      const converted: any = {};
      Object.keys(input).forEach((key) => {
        const camelKey = key.replace(/([-_][a-z])/g, (group) =>
          group.toUpperCase().replace("-", "").replace("_", ""),
        );
        converted[camelKey] = convertToCamelCase(input[key]);
      });
      return converted;
    }
    return input;
  };

  return convertToCamelCase(data);
};
