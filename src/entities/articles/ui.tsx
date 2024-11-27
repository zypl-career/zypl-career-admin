import { FC } from "react";
import { Link } from "react-router-dom";
import { getDMY } from "@libs";
import { BlurImage, Button } from "@ui";
import { TArticleData, TArticleListProps } from "./types";
import { Edit, Trash2 } from "lucide-react";

export const ArticleList: FC<TArticleListProps> = ({ data, ...props }) => {
  const handleAction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    article: TArticleData,
    action: keyof Omit<TArticleListProps, "data">,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof props[action] === "function") {
      props[action](article);
    }
  };

  return (
    <section className="grid sm:grid-cols-3 gap-5">
      {data.map((article) => (
        <Link
          to={`/articles/${article.id}`}
          key={article.id}
          className="bg-white border group relative border-gray-200 rounded-xl transition-transform transform duration-300 ease-in-out overflow-hidden hover:shadow-2xl"
        >
          <BlurImage
            src={article.image}
            alt={article.title}
            className="rounded-t-xl object-cover w-full h-[272px] group-hover:scale-110 overflow-hidden"
            isSkeleton
          />
          <div className="p-4">
            <h2 className="font-bold md:text-xl pt-5">{article.title}</h2>
            <h2 className="text-xs text-right text-gray-500">
              {getDMY(article.createdAt)}
            </h2>
            <div className="absolute flex items-center gap-3 top-5 right-5 opacity-0 transition group-hover:opacity-100">
              <Button variant="secondary" asChild>
                <Link to={`/articles/${article.id}/edit`}>
                  <Edit />
                </Link>
              </Button>
              <Button
                onClick={(e) => handleAction(e, article, "onDelete")}
                variant="secondary"
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};
