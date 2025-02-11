export const fetchText = (url: string) => {
  return fetch(url).then((response) => response.text());
};
