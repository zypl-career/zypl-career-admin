import { Fragment } from "react";

export const LoadingTable = ({ row = 10 }: { row?: number }) => {
  return (
    <div
      role="status"
      className="space-y-4 animate-pulse dark:divide-gray-700 dark:border-gray-700"
    >
      {Array(row)
        .fill(null)
        .map((_, i) => (
          <Fragment key={i}>
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </Fragment>
        ))}
    </div>
  );
};
