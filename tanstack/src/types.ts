import { z } from "zod";

// BaseArticle Schema

export const BaseArticle = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  category: z.string(),
  likes: z.number(),
  wordCount: z.number(),
  image: z
    .object({
      uri: z.string(),
      altText: z.string(),
    })
    .optional(),
  writer: z.object({
    name: z.string(),
  }),
});

export type BaseArticle = z.infer<typeof BaseArticle>;

// RelatedArticle Schema
export const RelatedArticle = z.object({
  title: z.string(),
  id: z.string(),
  image: z
    .object({
      uri: z.string(),
      altText: z.string(),
    })
    .optional(),
});

export type RelatedArticle = z.infer<typeof RelatedArticle>;

export const Article = BaseArticle.extend({
  body: z.string(),
});
export type Article = z.infer<typeof Article>;

export const Comment = z.object({
  id: z.string(),
  text: z.string(),
  writer: z.string(),
});
export type Comment = z.infer<typeof Comment>;

export const GetArticleListResponse = z.object({
  articleList: z.object({
    totalPages: z.number(),
    articles: BaseArticle.array(),
  }),
});
export type GetArticleListResponse = z.infer<typeof GetArticleListResponse>;

export const GetArticleResponse = z.object({
  article: Article.nullish(),
});
export type GetArticleResponse = z.infer<typeof GetArticleResponse>;

export const GetRelatedArticlesResponse = z.object({
  article: z.object({
    id: z.string(),
    relatedArticles: BaseArticle.array(),
  }),
});

export type GetRelatedArticleResponse = z.infer<
  typeof GetRelatedArticlesResponse
>;

export const AddLikeResponse = z.object({
  addLike: z
    .object({
      likedArticle: z.object({
        id: z.string(),
        likes: z.number(),
      }),
    })
    .nullish(),
});

type AddLikeResponse = z.infer<typeof AddLikeResponse>;
