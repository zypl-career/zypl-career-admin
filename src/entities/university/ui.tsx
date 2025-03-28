import { Edit, Trash2 } from 'lucide-react';
import { FC, useCallback, useState } from 'react';
import { DeleteUniversity } from '@features';
import { Button } from '@ui';
import { TUniversity, TUniversityProps } from './types';

export const UniversityList: FC<TUniversityProps> = ({ data = [], ...props }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<TUniversity | null>(null);

  const handleAction = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      university: TUniversity,
      action: keyof Omit<TUniversityProps, 'data'>,
    ) => {
      e.preventDefault();
      e.stopPropagation();

      if (typeof props[action] === 'function') {
        props[action](university);
      }
    },
    [props],
  );

  const handleDelete = (university: TUniversity) => {
    setSelectedUniversity(university);
    setDeleteOpen(true);
  };

  return (
    <section className="grid gap-5 sm:grid-cols-3">
      {data.map((university) => (
        <div
          key={university.id}
          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-transform duration-300 ease-in-out hover:shadow-2xl"
        >
          <div className="p-4">
            <h2 className="text-lg font-bold">{university.name}</h2>
            <p className="text-sm text-gray-500">{university.city}</p>
            <p className="text-sm text-gray-500">{university.generalInfo}</p>
          </div>
          <div className="absolute right-5 top-5 flex items-center gap-3 opacity-0 transition group-hover:opacity-100">
            <Button onClick={(e) => handleAction(e, university, 'onEdit')} variant="secondary">
              <Edit />
            </Button>
            <Button onClick={() => handleDelete(university)} variant="secondary">
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
      {selectedUniversity && <DeleteUniversity id={selectedUniversity.id} open={deleteOpen} setOpen={setDeleteOpen} />}
    </section>
  );
};
