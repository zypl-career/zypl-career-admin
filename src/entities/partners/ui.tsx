import { FC, useCallback, useState } from "react";
import { TPartners, TPartnersProps } from "./types";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { BlurImage, Button } from "@ui";
import { getDMY } from "@libs";
import { DeletePartner } from "@/features/partners/components/delete/ui.tsx";

export const PartnersList: FC<TPartnersProps> = ({ data = [], ...props }) => {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [currentPartnerId, setCurrentPartnerId] = useState<string | null>(null);

  const handleAction = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      partner: TPartners,
      action: keyof Omit<TPartnersProps, "data">,
    ) => {
      e.preventDefault();
      e.stopPropagation();

      if (action === "onDelete") {
        setCurrentPartnerId(partner.id);
        setDeleteOpen(true);
      } else if (typeof props[action] === "function") {
        props[action](partner);
      }
    },
    [props],
  );

  return (
    <>
      <section className="grid sm:grid-cols-3 gap-5">
        {data.map((partner) => (
          <Link
            to={`/partners/${partner.id}`}
            key={partner.id}
            className="bg-white border group relative border-gray-200 rounded-xl transition-transform transform duration-300 ease-in-out overflow-hidden hover:shadow-2xl"
          >
            <BlurImage
              src={partner.image}
              alt="partner"
              className="rounded-t-xl object-cover w-full h-[272px] group-hover:scale-110 overflow-hidden"
              isSkeleton
            />
            <div className="p-4">
              <h2 className="text-xs text-right text-gray-500">
                {getDMY(partner.createdAt)}
              </h2>
            </div>
            <div className="absolute flex items-center gap-3 top-5 right-5 opacity-0 transition group-hover:opacity-100">
              <Button
                onClick={(e) => handleAction(e, partner, "onEdit")}
                variant="secondary"
              >
                <Edit />
              </Button>
              <Button
                onClick={(e) => handleAction(e, partner, "onDelete")}
                variant="secondary"
              >
                <Trash2 />
              </Button>
            </div>
          </Link>
        ))}
      </section>
      {currentPartnerId && (
        <DeletePartner
          id={currentPartnerId}
          open={isDeleteOpen}
          setOpen={setDeleteOpen}
        />
      )}
    </>
  );
};
