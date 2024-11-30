import { DialogProps } from '@radix-ui/react-dialog';
import { FC, ReactNode } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@ui';
import { VisuallyHiddenComponent } from './utils.tsx';

export type TModalProps = DialogProps & {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  children?: ReactNode;
  className?: string;
};

export const Modal: FC<TModalProps> = ({ toggle, setToggle, children, className, ...props }) => {
  return (
    <Dialog open={toggle} onOpenChange={setToggle} {...props}>
      <DialogTitle>
        <VisuallyHiddenComponent> </VisuallyHiddenComponent>
      </DialogTitle>
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
};
