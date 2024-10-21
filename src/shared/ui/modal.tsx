import { Dialog, DialogContent, DialogTitle } from '@ui';
import { FC, ReactNode } from 'react';
import { VisuallyHiddenComponent } from './utils.tsx';

export type TModalProps = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  children?: ReactNode;
};

export const Modal: FC<TModalProps> = ({ toggle, setToggle, children }) => {
  return (
    <Dialog open={toggle} onOpenChange={setToggle}>
      <DialogTitle>
        <VisuallyHiddenComponent> </VisuallyHiddenComponent>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
