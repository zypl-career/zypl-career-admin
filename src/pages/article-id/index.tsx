import { getDMY } from '@/shared/libs';
import { Badge, BlockNote, BlurImage } from '@/shared/ui';
import { useParams } from 'react-router-dom';
import { useArticleId } from '@features';

const ArticlePageId = () => {
  const { id = '' } = useParams();
  const { data, isLoading } = useArticleId(id);

  return (
    <main className="container max-w-2xl bg-gray-100 py-5">
      <header className="mb-4">
        <BlurImage src={data?.image} isSkeleton className="rounded-xl" />
        <h1 className="my-2 text-4xl font-bold">{data?.title}</h1>
        <h2 className="text-xs text-gray-600">{getDMY(data?.createdAt || '')}</h2>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h3>Теги:</h3>
          {data?.hashtags.map((hashtag) => (
            <Badge variant="secondary" key={hashtag}>
              #{hashtag}
            </Badge>
          ))}
        </div>
      </header>
      {data?.description && !isLoading ? (
        <BlockNote domAttributes={{ editor: { class: 'bg-transparent' } }} editable={false} value={data?.description} />
      ) : null}

      {/* <div dangerouslySetInnerHTML={{ __html: data?.description || '' }} /> */}
    </main>
  );
};

export default ArticlePageId;
