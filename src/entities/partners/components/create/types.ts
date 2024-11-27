export interface TCreatePartner {
    name: string;
    image: File | undefined;
    createdAt: string;
  }
  
  export interface TCreatePartnerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
  }
  