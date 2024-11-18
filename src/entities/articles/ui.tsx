import { FC } from "react";
import { Link } from "react-router-dom";
import { getDMY } from "@libs";
import { BlockNote, BlurImage, Button } from "@ui";
import { TArticleData, TArticleListProps } from "./types";
import { Edit, Trash2 } from "lucide-react";
import { PartialBlock } from "@blocknote/core";

export const ArticleList: FC<TArticleListProps> = ({ data, ...props }) => {
  const handleAction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    article: TArticleData,
    action: keyof Omit<TArticleListProps, 'data'>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof props[action] === 'function') {
      props[action](article)
    }
  };


  return (
    <section className="grid sm:grid-cols-3 gap-5">
      {data.map((article) => {
        const description = (JSON.parse(article.description) as PartialBlock[]).filter((block) => block.type === 'paragraph');
        return (
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
            <BlockNote editable={false} value={JSON.stringify(description)} domAttributes={{editor: { class: 'min-h-auto' }}} />
            <h2 className="text-xs text-right text-gray-500">
              {getDMY(article.createdAt)}
            </h2>
            <div className="absolute flex items-center gap-3 top-5 right-5 opacity-0 transition group-hover:opacity-100">
              <Button onClick={(e) => handleAction(e, article, 'onEdit')} variant="secondary">
                <Edit />
              </Button>
              <Button onClick={(e) => handleAction(e, article, 'onDelete')} variant="secondary">
                <Trash2 />
              </Button>
            </div>
          </div>
        </Link>
      )})}
    </section>
  );
};

