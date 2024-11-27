export type TPartners = {
  id: string
  image: string
  createdAt: number
  deletedAt: number
}

export type TPartnersProps = {
  data: TPartners[];
  onEdit: (data: TPartners) => void;
  onDelete: (data: TPartners) => void;
}
