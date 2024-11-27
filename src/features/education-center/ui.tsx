import { useState } from "react";
import { EducationCenterList, TEducationCenter } from "@entities";
import { Button, Spinner } from "@ui";
import { useGetEducationCenters } from "./services";
import { CreateEducationCenter } from "@/features";

export const EducationCenters = () => {
  const [filters, setFilters] = useState({
    city: "",
    title: "",
    limit: 10,
    page: 1,
  });

  const { data, isLoading } = useGetEducationCenters(filters);

  const [editCenter, setEditCenter] = useState<Partial<TEducationCenter>>();
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

  const handleEdit = (value: Partial<TEducationCenter>) => {
    handleToggleModals("edit");
    setEditCenter(value);
  };

  const handleDelete = (value: Partial<TEducationCenter>) => {
    handleToggleModals("delete");
    setEditCenter(value);
  };

  return (
    <section>
      <header>
        <h2>Образовательные центры</h2>
        <Button onClick={() => handleToggleModals("create")}>
          Добавить образовательный центр
        </Button>
      </header>
      {isLoading ? (
        <Spinner />
      ) : data?.data?.length === 0 ? (
        <p>Нет образовательных центров для отображения</p>
      ) : (
        <EducationCenterList
          data={data?.data ?? []}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      <CreateEducationCenter
        open={modals.create}
        toggle={() => handleToggleModals("create")}
      />
    </section>
  );
};
