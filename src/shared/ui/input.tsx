import * as React from 'react';

import { cn } from '@libs';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <>
        {label ? <label htmlFor={label}>{label}</label> : null}
        <input
          type={type}
          id={label}
          className={cn(
            'flex w-full rounded-lg error:border-red-400 border border-input bg-background px-3 py-2.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
