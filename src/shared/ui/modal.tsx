import { Dialog, DialogContent, DialogTitle } from '@ui';
import { FC, ReactNode } from 'react';
import { VisuallyHiddenComponent } from './utils.tsx';
import { DialogProps } from '@radix-ui/react-dialog';

export type TModalProps = DialogProps & {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  children?: ReactNode;
  className?: string;
};

export const Modal: FC<TModalProps> = ({
  toggle,
  setToggle,
  children,
  className,
  ...props
}) => {
  return (
    <Dialog open={toggle} onOpenChange={setToggle} {...props}>
      <DialogTitle>
        <VisuallyHiddenComponent> </VisuallyHiddenComponent>
      </DialogTitle>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
};
