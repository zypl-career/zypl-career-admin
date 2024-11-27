import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getDMY } from '@libs';
import { BlurImage, Button } from '@ui';
import { TArticleData, TArticleListProps } from './types';
import { Edit, Trash2 } from 'lucide-react';

export const ArticleList: FC<TArticleListProps> = ({ data, ...props }) => {
  const handleAction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    article: TArticleData,
    action: keyof Omit<TArticleListProps, 'data'>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof props[action] === 'function') {
      props[action](article);
    }
  };

  return (
    <section className="grid gap-5 sm:grid-cols-3">
      {data.map((article) => (
        <Link
          to={`/articles/${article.id}`}
          key={article.id}
          className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-transform duration-300 ease-in-out hover:shadow-2xl"
        >
          <BlurImage
            src={article.image}
            alt={article.title}
            className="h-[272px] w-full overflow-hidden rounded-t-xl object-cover group-hover:scale-110"
            isSkeleton
          />
          <div className="p-4">
            <h2 className="pt-5 font-bold md:text-xl">{article.title}</h2>
            <h2 className="text-right text-xs text-gray-500">
              {getDMY(article.createdAt)}
            </h2>
            <div className="absolute right-5 top-5 flex items-center gap-3 opacity-0 transition group-hover:opacity-100">
              <Button variant="secondary" asChild>
                <Link to={`/articles/${article.id}/edit`}>
                  <Edit />
                </Link>
              </Button>
              <Button
                onClick={(e) => handleAction(e, article, 'onDelete')}
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
