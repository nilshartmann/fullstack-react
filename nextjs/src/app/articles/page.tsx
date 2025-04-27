import ArticleListGrid from "@/components/articlelistpage/ArticleListGrid";
import { fetchArticleList } from "@/queries/queries";

export default async function ArticleListPage() {
  const articles = await fetchArticleList();

  console.log(
    ">>>>>>>>>>>>> Rendering Articles ",
    new Date().toLocaleTimeString(),
  );

  return <ArticleListGrid articles={articles.articles} />;
}
