import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import ArticlePageLayout from "@/components/articlepage/ArticlePageLayout.tsx";

import { Article, GetArticleResponse } from "@/types.ts";

const loadArticle = createServerFn({ method: "GET" })
  .validator((d) => z.string().parse(d))
  .handler(async ({ data: articleId }) => {
    console.log("Loading Data on Server", articleId);
    const response = await ky
      .get(`http://localhost:20080/api/get-article/${articleId}`)
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

    return context.queryClient.ensureQueryData(
      getArticleQueryOpts(params.articleId),
    );
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
      sidebar={<RelatedArticleSlider articleId={articleId} />}
    />
  );
}
