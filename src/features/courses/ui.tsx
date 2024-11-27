import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { CourseTableUI } from '@entities';
import { Button, LoadingTable } from '@ui';
import { type TCourseData } from '@/entities/courses/types';
import { useCourses } from './services';
import { DeleteCourse } from './components';

export const Courses = () => {
  const { data, isLoading } = useCourses();

  const [toggleModals, setToggleModals] = useState({
    edit: false,
    delete: false,
  });
  const [deleteId, setDeleteId] = useState<TCourseData['id']>('0');
  const handleDelete = (value: TCourseData['id']) => {
    setToggleModals((prev) => ({
      ...prev,
      delete: !prev.delete,
    }));
    setDeleteId(value);
  };

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Курсы</h1>
        </div>
        <Button asChild>
          <Link to="/course/create">
            <PlusIcon />
            Добавить курс
          </Link>
        </Button>
      </header>
      {isLoading ? (
        <LoadingTable />
      ) : (
        <CourseTableUI data={data?.data || []} onDelete={handleDelete} />
      )}
      <DeleteCourse
        id={deleteId}
        open={toggleModals.delete}
        setOpen={(value) =>
          setToggleModals((prev) => ({ ...prev, delete: value }))
        }
      />
    </section>
  );
};
