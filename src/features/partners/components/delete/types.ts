import { TPartners } from "@entities";

export type TDeletePartnerProps = {
    id: TPartners['id'];
    open: boolean;
    setOpen: (state: boolean) => void;
};
