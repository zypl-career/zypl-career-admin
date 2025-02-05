export const toMb = (size: number): number => {
  return size / (1024 * 1024);
};

export const blobToFile = (blob: Blob, fileName: string = 'export') => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const contentDisposition = blob.type.split('/')[1];
  link.download = `${fileName}.${contentDisposition}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const downloadFile = async (url: string = '', fileName?: string) => {
  return await fetch(url)
    .then((response) => response.blob())
    .then((blob) => blobToFile(blob, fileName))
    // eslint-disable-next-line no-console
    .catch((error) => console.dir('Download error:', error));
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
