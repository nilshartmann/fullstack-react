import ArticleCard from "@/components/ArticleCard";
import { BaseArticle } from "@/types";

type ArticleListGridProps = {
  articles: Array<BaseArticle>;
};

export default function ArticleListGrid({ articles }: ArticleListGridProps) {
  return (
    <div className={"container mx-auto space-y-4"}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => {
          return <ArticleCard key={a.id} article={a} />;
        })}
      </div>
    </div>
  );
}
