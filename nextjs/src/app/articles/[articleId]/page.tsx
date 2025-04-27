import { notFound } from "next/navigation";

import ArticlePageLayout from "@/components/articlepage/ArticlePageLayout";
import { fetchArticle } from "@/queries/queries";

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

  const article = await fetchArticle(articleId);
  if (!article) {
    return notFound();
  }

  return <ArticlePageLayout article={article} />;
}
