import { type TCourseData } from '@/entities/courses/types';
import { CourseTableUI } from '@entities';
import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button, LoadingTable } from '@ui';
import { DeleteCourse } from './components';
import { useCourses } from './services';

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
