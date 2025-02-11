import { fetchText } from '@libs';
import { FC, useEffect, useState } from 'react';
import { Skeleton } from '@ui';

type AsyncTextProps = {
  file: string;
  getText?: (file: string) => Promise<string>;
};

export const AsyncText: FC<AsyncTextProps> = ({ file, getText = fetchText }) => {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const resolvedText = await getText(file);
      setText(resolvedText);
    };

    fetchContent();
  }, [file, getText]);

  return text ?? <Skeleton className="h-5 w-10" />;
};
