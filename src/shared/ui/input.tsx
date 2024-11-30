import { cn } from '@libs';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const inputVariant = cva(
  'flex w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 error:border-red-400',
  {
    variants: {
      variant: {
        ghost: 'border-none hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        lg: 'text-lg',
        default: 'text-sm',
      },
    },
    defaultVariants: {
      // variant: 'default',
      size: 'default',
    },
  },
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariant> & {
    label?: string;
    onEnter?: (value: string) => void;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, variant, size, onEnter, onKeyDown, ...props }, ref) => {
    const handlePressEnter = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (onKeyDown) {
          onKeyDown(event);
        }
        if (event.key === 'Enter' && onEnter && props.value) {
          event.preventDefault();
          onEnter(props.value.toString());
        }
      },
      [onEnter, onKeyDown, props.value],
    );

    return (
      <>
        {label ? <label htmlFor={label}>{label}</label> : null}
        <input
          type={type}
          id={label}
          ref={ref}
          className={cn(inputVariant({ variant, size, className }))}
          onKeyDown={handlePressEnter}
          {...props}
        />
      </>
    );
  },
);
Input.displayName = 'Input';

export { Input };
