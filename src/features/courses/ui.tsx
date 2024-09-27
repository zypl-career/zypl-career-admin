import { CourseTableUI } from "@entities"
import { Button, Spinner } from "@ui"
import { useCourses } from "./services"
import { Link } from "react-router-dom"
import { useState } from "react"
import { TCourseData } from "@/entities/courses/types"
import { DeleteCourse } from "./components"

export const Courses = () => {
  const { data, isLoading } = useCourses()

  const [toggleModals, setToggleModals] = useState({
    edit: false,
    delete: false,
  });
  const [deleteId, setDeleteId] = useState<TCourseData['id']>('0')
  const handleDelete = (value: TCourseData['id']) => {
    setToggleModals(prev => ({
      ...prev,
      delete: !prev.delete,
    }));
    setDeleteId(value)
  }

  return (
    <section>
      <div className="flex justify-end mb-6">
        <Button asChild>
          <Link to="/course/create">
            Добавить курс
          </Link>
        </Button>
      </div>
      {isLoading ? <Spinner /> : (
        <CourseTableUI
          data={data?.data || []}
          onDelete={handleDelete}
        />
      )}
      <DeleteCourse
        id={deleteId}
        open={toggleModals.delete}
        setOpen={value => setToggleModals(prev => ({ ...prev, delete: value }))}
      />
    </section>
  )
}
