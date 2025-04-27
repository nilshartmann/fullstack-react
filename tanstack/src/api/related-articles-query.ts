import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import ky from "ky";
import { queryOptions } from "@tanstack/react-query";
import { BaseArticle, GetRelatedArticlesResponse } from "@/types.ts";

const loadRelatedArticles = createServerFn({ method: "GET" })
  .validator((d) => z.string().parse(d))
  .handler(async ({ data: articleId }) => {
    console.log("Loading Related Articles on Server", articleId);
    const response = await ky
      .get(
        `http://localhost:20080/api/get-related-articles/${articleId}?slowDown=3000`,
      )
      .json();

    //
    return GetRelatedArticlesResponse.parse(response).article.relatedArticles;
  });

export const getRelatedArticleOpts = (articleId: string) =>
  queryOptions({
    queryKey: ["related-articles", articleId],
    async queryFn(): Promise<Array<BaseArticle>> {
      return loadRelatedArticles({ data: articleId });
    },
  });
