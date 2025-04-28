import { notFound } from "next/navigation";
import { Suspense } from "react";

import ArticlePageLayout from "@/components/articlepage/ArticlePageLayout";
import RelatedArticleBox from "@/components/articlepage/RelatedArticleBox";
import RelatedArticleSlider from "@/components/articlepage/RelatedArticleSlider";
import LoadingIndicator from "@/components/LoadingIndicator";
import { fetchArticle, fetchRelatedArticles } from "@/queries/queries";

type ArticleIdPageProps = {
  params: Promise<Record<string, string>>;
};

// React Server Components (RSC)

export default async function ArticlePage({ params }: ArticleIdPageProps) {
  const { articleId } = await params;

  console.log("RENDERING ARTGICLE", articleId, new Date().toLocaleTimeString());

  const relatedArticlePromise = fetchRelatedArticles(articleId).then(
    (relatedArticlesList) =>
      relatedArticlesList.map((ra) => (
        <RelatedArticleBox key={ra.id} article={ra} />
      )),
  );
  const article = await fetchArticle(articleId);
  if (!article) {
    return notFound();
  }

  return (
    <ArticlePageLayout
      article={article}
      sidebar={
        <Suspense fallback={<LoadingIndicator />}>
          <RelatedArticleSlider relatedArticlePromise={relatedArticlePromise} />
        </Suspense>
      }
    />
  );
}
