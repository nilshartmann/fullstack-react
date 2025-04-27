import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import ky from "ky";
import ArticlePageLayout from "@/components/articlepage/ArticlePageLayout.tsx";

import { Article, GetArticleResponse } from "@/types.ts";

// -------------------
// aopts
// -------------------
const getArticleQueryOpts = (articleId: string) =>
  queryOptions({
    queryKey: ["articles", articleId],

    //
    async queryFn(): Promise<Article | null> {
      //
      const response = await ky
        .get(`http://localhost:20080/api/get-article/${articleId}`)
        .json();

      //
      return GetArticleResponse.parse(response).article ?? null;
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
    return context.queryClient.ensureQueryData(
      getArticleQueryOpts(params.articleId),
    );
  },
});

function RouteComponent() {
  const { articleId } = Route.useParams();
  const response = useSuspenseQuery(getArticleQueryOpts(articleId));

  if (!response.data) {
    return <h1>not found</h1>;
  }

  return <ArticlePageLayout article={response.data} />;
}
