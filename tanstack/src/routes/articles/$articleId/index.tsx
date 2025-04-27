import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Suspense } from "react";
import ArticlePageLayout from "@/components/articlepage/ArticlePageLayout.tsx";

import {
  Article,
  BaseArticle,
  GetArticleResponse,
  GetRelatedArticlesResponse,
} from "@/types.ts";
import { delayConfig } from "@/demo-config.ts";
import RelatedArticleSlider from "@/components/articlepage/RelatedArticleSlider.tsx";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";
import { GlobalLoadingIndicator } from "@/components/GlobalLoadingIndicator.tsx";
import { getRelatedArticleOpts } from "@/api/related-articles-query.ts";

const loadArticle = createServerFn({ method: "GET" })
  .validator((d) => z.string().parse(d))
  .handler(async ({ data: articleId }) => {
    console.log("Loading Data on Server", articleId);
    const response = await ky
      .get(`http://localhost:20080/api/get-article/${articleId}?slowDown=2000`)
      .json();

    //
    return GetArticleResponse.parse(response).article ?? null;
  });

// -------------------
// aopts
// -------------------
const getArticleQueryOpts = (articleId: string) =>
  queryOptions({
    queryKey: ["articles", articleId],

    //
    async queryFn(): Promise<Article | null> {
      //
      return loadArticle({ data: articleId });
    },
  });

export const Route = createFileRoute("/articles/$articleId/")({
  component: RouteComponent,
  // ---------------------
  // aload
  // ----------------------
  async loader({ context, params }) {
    // Loader brauchen wir eigentlich erst für SSR, aber von Anfang an
    // richtig machen

    console.log("Route Loader for ", params.articleId);

    context.queryClient.ensureQueryData(
      getRelatedArticleOpts(params.articleId),
    );

    // Mit 'return' wartet der Server -> KEINE Pending Component!
    // OHNE 'return' kein Warten -> dann wird im Client gewartet
    context.queryClient.ensureQueryData(getArticleQueryOpts(params.articleId));
  },

  // Erst RelatedArticleSlider einbauen,
  // DANN Pending Component
  // DANN SUSPENSE
  //
  pendingComponent: GlobalLoadingIndicator,
});

function RouteComponent() {
  const { articleId } = Route.useParams();
  const response = useSuspenseQuery(getArticleQueryOpts(articleId));

  if (!response.data) {
    return <h1>not found</h1>;
  }

  return (
    <ArticlePageLayout
      article={response.data}
      sidebar={
        <Suspense fallback={<LoadingIndicator />}>
          <RelatedArticleSlider articleId={articleId} />
        </Suspense>
      }
    />
  );
}
