import { notFound } from "next/navigation";
import { Suspense } from "react";

import ArticlePageLayout from "@/components/articlepage/ArticlePageLayout";
import RelatedArticleSlider from "@/components/articlepage/RelatedArticleSlider";
import LoadingIndicator from "@/components/LoadingIndicator";
import { fetchArticle, fetchRelatedArticles } from "@/queries/queries";

type ArticleIdPageProps = {
  params: Promise<Record<string, string>>;
};

// -----------------------
//  apage
// -----------------------

//  BEIDE ROUTEN AUSSCHLIESSLICH SERVER COMPONENTS!
//  TROTZDEM BLEIBT DER STATE ERHALTEN:
//    -> Newsletter Subscription
//    -> Breaking News (in demo-config einschalten!)
//

export default async function ArticlePage({ params }: ArticleIdPageProps) {
  const { articleId } = await params;

  // Selbes Problem wie mit TS Start initial: WASSER FALL
  //  => wir reparieren das gleich
  //  => WIR ÜBERTRAGEN **DATEN** VOM SERVER ZUM CLIENT
  const relatedArticlesPromise = fetchRelatedArticles(articleId);
  const article = await fetchArticle(articleId);
  if (!article) {
    return notFound();
  }

  return (
    <ArticlePageLayout
      article={article}
      sidebar={
        <Suspense fallback={<LoadingIndicator />}>
          <RelatedArticleSlider
            relatedArticlesPromise={relatedArticlesPromise}
          />
        </Suspense>
      }
    />
  );
}
