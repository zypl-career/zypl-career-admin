import { FC, useCallback } from 'react';
import { TPartners, TPartnersProps } from './types';
import { Edit, Trash2 } from 'lucide-react';
import { BlurImage, Button } from '@ui';
import { getDMY } from '@libs';

export const PartnersList: FC<TPartnersProps> = ({ data = [], ...props }) => {
  const handleAction = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      partner: TPartners,
      action: keyof Omit<TPartnersProps, 'data'>,
    ) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (typeof props[action] === 'function') {
        props[action](partner);
      }
    },
    [props],
  );

  return (
    <section className="grid gap-5 sm:grid-cols-3">
      {data.map((partner) => (
        <div
          key={partner.id}
          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-transform duration-300 ease-in-out hover:shadow-2xl"
        >
          <BlurImage
            src={partner.image}
            alt="partner"
            className="h-[272px] w-full overflow-hidden rounded-t-xl object-cover group-hover:scale-110"
            isSkeleton
          />
          <div className="absolute bottom-2 right-5 z-10 rounded-full bg-white p-2">
            <h2 className="text-right text-xs text-gray-600">
              {getDMY(partner.createdAt)}
            </h2>
          </div>
          <div className="absolute right-5 top-5 flex items-center gap-3 opacity-0 transition group-hover:opacity-100">
            <Button onClick={(e) => handleAction(e, partner, 'onEdit')} variant="secondary">
              <Edit />
            </Button>
            <Button onClick={(e) => handleAction(e, partner, 'onDelete')} variant="secondary">
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
    </section>
  );
};
