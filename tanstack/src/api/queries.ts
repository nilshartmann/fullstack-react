import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import _ky from "ky";
import { delayConfig } from "@/demo-config.ts";

import { AddLikeResponse, GetArticleListResponse } from "@/types.ts";

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
