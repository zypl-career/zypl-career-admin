import { PlusIcon} from "lucide-react";
import { useState } from "react";
import { ArticleList, TArticleData } from "@entities";
import { Button, Spinner } from "@ui";
import { CreateArticle, DeleteArticle } from "./components";
import { useArticles } from "./services";
import { Link } from "react-router-dom";

export const Article = () => {
  const {data, isLoading} = useArticles();
  const [toggleModals, setToggleModals] = useState({
    edit: false,
    delete: false,
    create: false,
    preview: false,
  });
  const [deleteArticle, setDeleteArticle] = useState<Partial<TArticleData>>()

  const handleToggleModals = (value: keyof typeof toggleModals) => {
    setToggleModals(prev => ({
      ...prev,
      [value]: !prev[value],
    }))
  };

  
  const handleDelete = (value: Partial<TArticleData>) => {
    handleToggleModals('delete')
    setDeleteArticle(value)
  };

  return (
    <section>
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Статьи</h1>
        </div>
        <Button asChild>
          <Link to="/articles/create">
            <PlusIcon />
            Добавить статью
          </Link>
        </Button>
      </header>
      {isLoading ? (
        <Spinner />
      ) : (
        <ArticleList
          data={data?.data || []}
          onDelete={handleDelete}
        />
      )}
      <CreateArticle
        open={toggleModals.create}
        setOpen={(value) =>
          setToggleModals((prev) => ({...prev, create: value}))
        }
      />
      {/* <UpdateArticle
        open={toggleModals.edit}
        setOpen={(value) => setToggleModals((prev) => ({ ...prev, edit: value }))}
        data={edit}
      /> */}
      <DeleteArticle
        open={toggleModals.delete}
        setOpen={(value) => setToggleModals((prev) => ({ ...prev, delete: value }))}
        id={deleteArticle?.id || ''}
      />
    </section>
  );
};
