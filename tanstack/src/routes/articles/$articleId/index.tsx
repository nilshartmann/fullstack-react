import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Suspense } from "react";

import ArticlePageLayout from "@/components/articlepage/ArticlePageLayout.tsx";
import RelatedArticleSlider from "@/components/articlepage/RelatedArticleSlider.tsx";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";
import { getArticleOpts, getRelatedArticleOpts } from "@/queries.ts";

export const Route = createFileRoute("/articles/$articleId/")({
  notFoundComponent: () => {
    const { articleId } = Route.useParams();
    return <h1>Not Found: {articleId}</h1>;
  },
  async loader({ context, params }) {
    // Note:
    //  - we do NOT return the promise from 'ensureQueryData' here
    //    for the related articles. We just want to START the request
    //    as early as possible
    //  - but we DO return a promise for the actual article data, as
    //    we want the side to be completely SSR'ed
    context.queryClient.ensureQueryData(
      getRelatedArticleOpts(params.articleId),
    );
    const article = await context.queryClient.ensureQueryData(
      getArticleOpts(params.articleId),
    );
    if (!article) {
      throw notFound();
    }

    return article;
    //
  },
  component: ArticlePage,
});

function ArticlePage() {
  const articleId = Route.useParams().articleId;
  const { data: article } = useSuspenseQuery(getArticleOpts(articleId));

  if (!article) {
    throw notFound();
  }

  return (
    <ArticlePageLayout
      article={article}
      sidebar={
        <Suspense fallback={<LoadingIndicator />}>
          <RelatedArticleSlider articleId={article.id} />
        </Suspense>
      }
    />
  );
  // <>
  //   <ArticleBanner article={article} />
  //   <TwoColumnLayout
  //     sidebar={
  //       <Sidebar>
  //         <SidebarBox title={"Related Articles"}>

  //         </SidebarBox>
  //       </Sidebar>
  //     }
  //   >
  //     <ArticleBody body={article.body} />
  //   </TwoColumnLayout>
  // </>
}
