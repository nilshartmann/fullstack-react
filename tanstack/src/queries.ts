import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import _ky from "ky";
import { delayConfig } from "@/demo-config.ts";

import {
  AddLikeResponse,
  Article,
  BaseArticle,
  GetArticleListResponse,
  GetArticleResponse,
  GetRelatedArticlesResponse,
} from "@/types.ts";

const ky = _ky.extend({
  prefixUrl: "http://localhost:20080/api/",
  retry: 0,
});

export const getArticleListOpts = () =>
  queryOptions({
    queryKey: ["articles"],
    async queryFn(): Promise<GetArticleListResponse["articleList"]> {
      const response = await ky.get("get-article-list?pageSize=3").json();
      return GetArticleListResponse.parse(response).articleList;
    },
  });

export const getArticleOpts = (articleId: string) =>
  queryOptions({
    queryKey: ["articles", articleId],
    async queryFn(): Promise<Article | null> {
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
      const response = await ky
        .patch(`add-like/${articleId}?slowDown=${delayConfig.AddLike}`)
        .json();
      const addLikes = AddLikeResponse.parse(response);
      if (addLikes.addLike) {
        return addLikes.addLike.likedArticle.likes;
      }
      return null;
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ["articles"],
      });
    },
  });
}
