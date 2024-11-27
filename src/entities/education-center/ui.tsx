import { FC, useCallback } from 'react';
import { TEducationCenter, TEducationCenterProps } from './types';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { BlurImage, Button } from '@ui';
import { getDMY } from '@libs';

export const EducationCenterList: FC<TEducationCenterProps> = ({
  data = [],
  ...props
}) => {
  const handleAction = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      center: TEducationCenter,
      action: keyof Omit<TEducationCenterProps, 'data'>,
    ) => {
      e.preventDefault();
      e.stopPropagation();

      if (typeof props[action] === 'function') {
        props[action](center);
      }
    },
    [props],
  );

  return (
    <section className="grid gap-5 sm:grid-cols-3">
      {data.map((center) => (
        <Link
          to={`/education-center/${center.id}`}
          key={center.id}
          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-transform duration-300 ease-in-out hover:shadow-2xl"
        >
          <BlurImage
            src={center.image}
            alt={center.title}
            className="h-[272px] w-full overflow-hidden rounded-t-xl object-cover group-hover:scale-110"
            isSkeleton
          />
          <div className="p-4">
            <h2 className="text-right text-xs text-gray-500">
              {getDMY(center.createdAt)}
            </h2>
            <h3 className="text-lg font-semibold">{center.title}</h3>
            <p className="text-sm text-gray-500">{center.city}</p>
          </div>
          <div className="absolute right-5 top-5 flex items-center gap-3 opacity-0 transition group-hover:opacity-100">
            <Button
              onClick={(e) => handleAction(e, center, 'onEdit')}
              variant="secondary"
            >
              <Edit />
            </Button>
            <Button
              onClick={(e) => handleAction(e, center, 'onDelete')}
              variant="secondary"
            >
              <Trash2 />
            </Button>
          </div>
        </Link>
      ))}
    </section>
  );
};
