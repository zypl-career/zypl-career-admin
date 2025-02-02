import { LessonByIdTableUI, type TLessonIdData } from '@entities';
import { PlusIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCourseById } from '@features';
import { Button, LoadingTable, Skeleton } from '@ui';
import { CreateLesson, DeleteLessonId, UpdateLesson } from './components';
import { PreviewLesson } from './components/preview-lesson-id';
import { useLessonId } from './services';

export const LessonId = () => {
  const { id = '0' } = useParams();
  const { data = [], isLoading } = useLessonId(id);
  const { data: courseData, isLoading: courseLoading } = useCourseById(id);

  const [toggleModals, setToggleModals] = useState({
    edit: false,
    delete: false,
    create: false,
    preview: false,
  });
  const [deleteId, setDeleteId] = useState<TLessonIdData['id']>('0');
  const [editable, setEditable] = useState<Partial<TLessonIdData>>({});
  const [preview, setPreview] = useState<Partial<TLessonIdData>>({});
  const handleDelete = (value: TLessonIdData['id']) => {
    setToggleModals((prev) => ({
      ...prev,
      delete: !prev.delete,
    }));
    setDeleteId(value);
  };

  const handleEdit = (value: TLessonIdData) => {
    setToggleModals((prev) => ({
      ...prev,
      edit: !prev.edit,
    }));
    setEditable(value);
  };

  const handlePreview = (value: TLessonIdData) => {
    setPreview(value);
    setToggleModals((prev) => ({
      ...prev,
      preview: true,
    }));
  };

  return (
    <section>
      <header className="mb-6 flex items-center justify-between">
        {courseLoading ? (
          <Skeleton className="h-5 w-48" />
        ) : (
          <h1 className="text-2xl font-bold">Уроки курса {courseData?.title}</h1>
        )}
        <Button onClick={() => setToggleModals((prev) => ({ ...prev, create: true }))}>
          <PlusIcon />
          Добавить урок
        </Button>
      </header>
      {isLoading ? (
        <LoadingTable />
      ) : (
        <LessonByIdTableUI data={data} onDelete={handleDelete} onEdit={handleEdit} onPreview={handlePreview} />
      )}
      <CreateLesson
        open={toggleModals.create}
        setOpen={(value) => setToggleModals((prev) => ({ ...prev, create: value }))}
      />
      {toggleModals.edit ? (
        <UpdateLesson
          open={toggleModals.edit}
          setOpen={(value) => setToggleModals((prev) => ({ ...prev, edit: value }))}
          data={editable}
        />
      ) : null}
      <DeleteLessonId
        id={deleteId}
        open={toggleModals.delete}
        setOpen={(value) => setToggleModals((prev) => ({ ...prev, delete: value }))}
      />
      <PreviewLesson
        data={preview}
        open={toggleModals.preview}
        setOpen={(value) => setToggleModals((prev) => ({ ...prev, preview: value }))}
      />
    </section>
  );
};
