import { Fragment } from 'react';

export const LoadingTable = ({ row = 10 }: { row?: number }) => {
  return (
    <div role="status" className="animate-pulse space-y-4 dark:divide-gray-700 dark:border-gray-700">
      {Array(row)
        .fill(null)
        .map((_, i) => (
          <Fragment key={i}>
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </Fragment>
        ))}
    </div>
  );
};
