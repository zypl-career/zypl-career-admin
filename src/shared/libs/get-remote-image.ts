export const getRemoteImage = (url: string) => {
  const _url = import.meta.env.VITE_APP_STORAGE_API;
  return `${_url}${url}`;
};
