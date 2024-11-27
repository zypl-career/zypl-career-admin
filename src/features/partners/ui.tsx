import { PartnersList, TPartners } from "@entities";
import { Button, Spinner } from "@ui";
import { useGetPartners } from "./services";
import { useState } from "react";
import { CreatePartner } from "./components";

export const Partners = () => {
  const { data, isLoading } = useGetPartners();
  const [editPartner, setEditPartner] = useState<Partial<TPartners>>();
  const [deletePartner, setDeletePartner] = useState<Partial<TPartners>>();
  const [modals, setModals] = useState({
    create: false,
    edit: false,
    delete: false,
  });

  const handleToggleModals = (value: keyof typeof modals) => {
    setModals((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  const handleDelete = (value: Partial<TPartners>) => {
    handleToggleModals("delete");
    setDeletePartner(value);
  };

  const handleEdit = (value: Partial<TPartners>) => {
    handleToggleModals("edit");
    setEditPartner(value);
  };

  console.log(editPartner);
  console.log(deletePartner);

  return (
    <section>
      <header>
        <h2>Партнеры</h2>
        <Button onClick={() => handleToggleModals("create")}>
          Добавить партнера
        </Button>
      </header>
      {isLoading ? (
        <Spinner />
      ) : data?.data?.length === 0 ? (
        <p>Нет партнеров для отображения</p>
      ) : (
        <PartnersList
          data={data?.data ?? []}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      <CreatePartner
        open={modals.create}
        toggle={() => handleToggleModals("create")}
      />
    </section>
  );
};
