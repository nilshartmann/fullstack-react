import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import _ky from "ky";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  AddLikeResponse,
  Article,
  BaseArticle,
  GetArticleListResponse,
  GetArticleResponse,
  GetRelatedArticlesResponse,
} from "@/types.ts";
import { delayConfig } from "@/demo-config.ts";

const ky = _ky.extend({
  prefixUrl: "http://localhost:20080/api/",
  retry: 0,
});

const fetchArticleList = async () => {
  const response = await ky.get("get-article-list").json();
  return GetArticleListResponse.parse(response).articleList;
};

const fetchArticleListFromBackend = createServerFn({
  method: "GET",
}).handler(async () => {
  const response = await ky.get("get-article-list").json();
  return GetArticleListResponse.parse(response).articleList;
});

export const getArticleListOpts = () =>
  queryOptions({
    queryKey: ["articles"],
    async queryFn(): Promise<GetArticleListResponse["articleList"]> {
      return fetchArticleList();
    },
  });

export const getArticleOpts = (articleId: string) =>
  queryOptions({
    queryKey: ["articles", articleId],
    async queryFn(): Promise<Article | null> {
      // Note in real life we would use a server Function here too
      const response = await ky
        .get(`get-article/${articleId}?slowDown=${delayConfig.GetArticle}`)
        .json();
      return GetArticleResponse.parse(response).article ?? null;
    },
  });

export const getRelatedArticleOpts = (articleId: string) =>
  queryOptions({
    queryKey: ["related-articles", articleId],
    async queryFn(): Promise<Array<BaseArticle>> {
      // Note in real life we would use a server Function here too
      const response = await ky
        .get(
          `get-related-articles/${articleId}?slowDown=${delayConfig.GetRelatedArticles}`,
        )
        .json();
      return GetRelatedArticlesResponse.parse(response).article.relatedArticles;
    },
  });

export function useAddLikeMutation(articleId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-like", articleId],
    async mutationFn(): Promise<number | null> {
      return saveLikeAction({ data: articleId });
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ["articles"],
      });
    },
  });
}

const saveLikeAction = createServerFn({
  method: "POST",
})
  .validator((articleId: unknown) => z.string().parse(articleId))
  .handler(async ({ data: articleId }) => {
    console.log("Article Id", articleId);
    const response = await ky
      .patch(`add-like/${articleId}?slowDown=${delayConfig.AddLike}`)
      .json();
    const addLikes = AddLikeResponse.parse(response);
    console.log("addLIKES RESPONSE", addLikes);
    if (addLikes.addLike) {
      return addLikes.addLike.likedArticle.likes;
    }
    return null;
  });
