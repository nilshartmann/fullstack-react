import { createFileRoute } from "@tanstack/react-router";

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Suspense } from "react";
import { Article, GetArticleResponse } from "@/types.ts";
import ArticlePageLayout from "@/components/articlepage/ArticlePageLayout.tsx";
import { getRelatedArticleOpts } from "@/api/related-articles-query.ts";
import RelatedArticleSlider from "@/components/articlepage/RelatedArticleSlider.tsx";
import { GlobalLoadingIndicator } from "@/components/GlobalLoadingIndicator.tsx";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";

const getArticleQueryOpts = (articleId: string) =>
  queryOptions({
    queryKey: ["articles", articleId],

    //
    async queryFn(): Promise<Article | null> {
      return loadArticle({
        data: articleId,
      });
    },
    // staleTime: 5000,
  });

const loadArticle = createServerFn({ method: "GET" })
  .validator((s) => z.string().parse(s))
  .handler(async ({ data }) => {
    console.log("DATA ", data);

    const response = await ky
      .get(`http://localhost:20080/api/get-article/${data}`)
      .json();

    //
    return GetArticleResponse.parse(response).article ?? null;
  });

export const Route = createFileRoute("/articles/$articleId/")({
  component: RouteComponent,
  // pendingComponent: () => <GlobalLoadingIndicator />,
  async loader({ context, params }) {
    //
    context.queryClient.ensureQueryData(getArticleQueryOpts(params.articleId));

    context.queryClient.ensureQueryData(
      getRelatedArticleOpts(params.articleId),
    );
  },
});

function RouteComponent() {
  const { articleId } = Route.useParams();
  const data = useSuspenseQuery(getArticleQueryOpts(articleId));

  if (!data.data) {
    return <h1>Not found</h1>;
  }

  return (
    <ArticlePageLayout
      article={data.data}
      sidebar={
        <Suspense fallback={<LoadingIndicator />}>
          <RelatedArticleSlider articleId={articleId} />
        </Suspense>
      }
    />
  );
}
