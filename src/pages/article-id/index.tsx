import { getDMY } from "@/shared/libs";
import { Badge, BlurImage } from "@/shared/ui";
import { useArticleId } from "@features";
import { useParams } from "react-router-dom"

const ArticlePageId = () => {
  const { id = '' } = useParams();
  const { data } = useArticleId(id)

  return (
    <main className="max-w-2xl container bg-gray-100 py-5">
      <header className="mb-4">
        <BlurImage src={data?.image} isSkeleton className="rounded-xl" />
        <h1 className="text-4xl font-bold my-2">{data?.title}</h1>
        <h2 className="text-xs text-gray-600">{getDMY(data?.createdAt || '')}</h2>
        <div className="flex items-center flex-wrap gap-2 mt-2">
          <h3>Теги:</h3>
          {data?.hashtags.map((hashtag) => (
            <Badge variant="secondary" key={hashtag}>#{hashtag}</Badge>
          ))}
        </div>
      </header>
      <div dangerouslySetInnerHTML={{ __html: data?.description || '' }} />
    </main>
  )
}

export default ArticlePageId