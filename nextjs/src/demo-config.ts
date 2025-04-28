import { RelatedArticle } from "@/types";

export const enableSuspense = true;

export const enableRelatedArticlesButton = true;

// when set to true, also add
// <ReadingSpeedProvider> to /app/layout.tsx
export const showReadingSpeedChooser = false;

export const showBreakingNews = false;

/**
 * Can be used to artifically delay single GraphQL requests
 * to simulate slow response times from the backend
 *
 */
export const delayConfig: Record<string, number> = {
  // Article-List on `/articles`
  GetArticleList: 0,

  // Single Article on `/articles/[articleId]`
  GetArticle: 0,

  // Submitting the Newsletter form
  SubscribeNewsletter: 150,

  // Reading comments on `/articles/[articleId]`
  GetCommentList: 0,

  // Reading related articles on `/articles/[articleId]`,
  GetRelatedArticles: 1000,

  // Delay the response in LikesWidget
  AddLike: 250,
};

// Setting this to 'force-cache' will enable Next.js
// DATA cache, so graphql requests are not run twice
export const graphQlFetchCache: "force-cache" | null = null;

// used for excercies
export const dummyRelatedArticles: Array<RelatedArticle> = [
  {
    id: "A_7",
    title: "Related Article - 1",
    image: {
      uri: "/images/articles/s_7.webp",
      altText: "Related Article - 1",
    },
  },
  {
    id: "A_8",
    title: "Related Article - 2",
    image: {
      uri: "/images/articles/s_8.webp",
      altText: "Related Article - 2",
    },
  },
  {
    id: "A_9",
    title: "Related Article - 3",
    image: {
      uri: "/images/articles/s_9.webp",
      altText: "Related Article - 3",
    },
  },
];
