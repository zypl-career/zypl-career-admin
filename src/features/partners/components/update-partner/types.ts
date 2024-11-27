import { TPartners } from '@entities';

export type TCreatePartnerProps = {
  data: Partial<TPartners>;
  open: boolean;
  toggle: (open: boolean) => void;
};
