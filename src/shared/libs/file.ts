export const toMb = (size: number): number => {
  return size / (1024 * 1024);
};

export const blobToFile = (blob: Blob) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'export.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const downloadFile = async (url: string = '') => {
  return await fetch(url)
    .then((response) => response.blob())
    .then(blobToFile)
    // eslint-disable-next-line no-console
    .catch((error) => console.dir('Download error:', error));
};
