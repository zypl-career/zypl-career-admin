import { FC, useCallback, useState } from "react";
import { TEducationCenter, TEducationCenterProps } from "./types";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { BlurImage, Button } from "@ui";
import { getDMY } from "@libs";

export const EducationCenterList: FC<TEducationCenterProps> = ({
  data = [],
  ...props
}) => {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [currentCenterId, setCurrentCenterId] = useState<string | null>(null);

  const handleAction = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      center: TEducationCenter,
      action: keyof Omit<TEducationCenterProps, "data">,
    ) => {
      e.preventDefault();
      e.stopPropagation();

      if (action === "onDelete") {
        setCurrentCenterId(center.id);
        setDeleteOpen(true);
      } else if (typeof props[action] === "function") {
        props[action](center);
      }
    },
    [props],
  );

  return (
    <section className="grid sm:grid-cols-3 gap-5">
      {data.map((center) => (
        <Link
          to={`/education-center/${center.id}`}
          key={center.id}
          className="bg-white border group relative border-gray-200 rounded-xl transition-transform transform duration-300 ease-in-out overflow-hidden hover:shadow-2xl"
        >
          <BlurImage
            src={center.image}
            alt={center.title}
            className="rounded-t-xl object-cover w-full h-[272px] group-hover:scale-110 overflow-hidden"
            isSkeleton
          />
          <div className="p-4">
            <h2 className="text-xs text-right text-gray-500">
              {getDMY(center.createdAt)}
            </h2>
            <h3 className="text-lg font-semibold">{center.title}</h3>
            <p className="text-sm text-gray-500">{center.city}</p>
          </div>
          <div className="absolute flex items-center gap-3 top-5 right-5 opacity-0 transition group-hover:opacity-100">
            <Button
              onClick={(e) => handleAction(e, center, "onEdit")}
              variant="secondary"
            >
              <Edit />
            </Button>
            <Button
              onClick={(e) => handleAction(e, center, "onDelete")}
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
