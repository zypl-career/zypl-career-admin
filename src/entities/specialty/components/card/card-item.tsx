import { cn } from '@libs';
import { ChevronRightIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { FC, useCallback, useState } from 'react';
import { Button } from '@ui';
import { TSpecialtyCardItemProps } from '../types';

export const SpecialtyCardItem: FC<TSpecialtyCardItemProps> = ({
  data: specialtyItem,
  onDelete,
  onEdit,
}) => {
  const [toggleOpportunities, setToggleOpportunities] = useState(false);

  const handleToggle = useCallback(() => setToggleOpportunities((prev) => !prev), []);
  return (
    <section
      key={specialtyItem.id}
      className="relative self-baseline rounded-xl border border-gray-200 bg-white p-4"
    >
      <header className="absolute right-4 top-4">
        <Button variant="ghost" onClick={() => onEdit(specialtyItem)}>
          <PencilIcon />
        </Button>
        <Button variant="ghost" onClick={() => onDelete(specialtyItem)}>
          <Trash2Icon />
        </Button>
      </header>
      <dl className="flex flex-col divide-y">
        <div className="py-4">
          <dt className="text-gray-500">Номи ихтисос</dt>
          <dd className="font-medium">{specialtyItem.name}</dd>
        </div>
        <div className="py-4">
          <dt className="text-gray-500">Номи муассисаи таълимӣ</dt>
          <dd className="font-medium">{specialtyItem.universityName}</dd>
        </div>
        <div className="py-4">
          <dt className="text-gray-500">Маблағи таҳсил бо (сомонӣ)</dt>
          <dd className="font-medium">{specialtyItem.monthlyIncome}</dd>
        </div>
        <div className="py-4">
          <dt className="text-gray-500">Шакли таҳсил</dt>
          <dd className="font-medium">{specialtyItem.specialtyCode}</dd>
        </div>
        <div className="py-4">
          <dt className="text-gray-500">Таҳсилот</dt>
          <dd className="font-medium">{specialtyItem.clusterName}</dd>
        </div>
        <div className="py-4">
          <dt className="text-gray-500">Рамзи ихтисос</dt>
          <dd className="font-medium">{specialtyItem.specialtyCode}</dd>
        </div>
        <div className="py-4">
          <dt className="text-gray-500">Забони таҳсил</dt>
          <dd className="font-medium">{specialtyItem.languageOfStudy}</dd>
        </div>
      </dl>
      <div className="py-2">
        <header
          className="mb-3 flex cursor-pointer select-none items-center justify-between"
          onClick={handleToggle}
        >
          <h2 className="text-xl font-bold">Карьерные возможности:</h2>
          <ChevronRightIcon className={cn('transition', { 'rotate-90': toggleOpportunities })} />
        </header>
        <ul className={cn(!toggleOpportunities ? 'hidden' : 'flex flex-wrap items-center gap-2')}>
          {specialtyItem.careerOpportunities.map((careerItem: string, idx: number) => (
            <li key={idx} className=" rounded-full bg-gray-100 px-4 py-2 text-center">
              {careerItem}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
