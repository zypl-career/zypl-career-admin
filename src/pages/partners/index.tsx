import { CreatePartner, PartnersList } from "@/entities";
import { Partners } from "@/features/partners";
import { Button } from "@/shared/ui";
import { useState } from "react";


export const PartnersPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Partners />
      <PartnersList />
      <Button onClick={() => setModalOpen(true)}>Добавить партнера</Button>
      <CreatePartner open={isModalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default PartnersPage;
