import { useCallback, useState } from 'react';
import { apiService } from '../api';
import { blobToFile } from '../libs';
import { toast } from '../ui';

export const useExport = (url: string) => {
  const [isExportLoading, setIsExportLoading] = useState(false);

  const downloadHandler = useCallback(async () => {
    try {
      setIsExportLoading(true);
      const { data } = await apiService.get(url, {
        responseType: 'blob',
        headers: {
          'Content-Disposition': 'attachment;filename=report.xls',
          'Content-Type': 'application/octet-stream', // or "application/vnd.ms-excel"
        },
      });

      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      blobToFile(blob);
    } catch {
      toast({ variant: 'error', description: 'Failed to download file' });
    } finally {
      setIsExportLoading(false);
    }
  }, [url]);

  return { isExportLoading, downloadHandler };
};
