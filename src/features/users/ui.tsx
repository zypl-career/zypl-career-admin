import { TUserData, UserTableUI } from "@entities"
import { useUser } from "./services"
import { Spinner } from "@ui"
import { useState } from "react"
import { EditUser } from "./components"
import { DeleteUser } from "./components"

export const User = () => {
  const { data: users, isLoading } = useUser()
  const [toggleModals, setToggleModals] = useState({
    edit: false,
    delete: false,
  });
  const [editable, setEditable] = useState<Partial<TUserData>>({});
  const [deleteId, setDeleteId] = useState<TUserData['id']>(0)

  const handleEdit = (value: TUserData) => {
    setToggleModals(prev => ({
      ...prev,
      edit: !prev.edit,
    }));
    setEditable(value)
  }

  const handleDelete = (value: TUserData['id']) => {
    setToggleModals(prev => ({
      ...prev,
      delete: !prev.delete,
    }));
    setDeleteId(value)
  }

  return (
    <section>
      {isLoading ? <Spinner /> : (
        <UserTableUI
          data={users?.data || []}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      <EditUser
        editable={editable}
        toggle={toggleModals.edit}
        setToggle={value => setToggleModals(prev => ({ ...prev, edit: value }))}
      />
      <DeleteUser
        id={deleteId}
        open={toggleModals.delete}
        setOpen={value => setToggleModals(prev => ({ ...prev, delete: value }))}
      />
    </section>
  )
}
