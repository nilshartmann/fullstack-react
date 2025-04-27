"use client";

import { useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import RelatedArticleBox from "@/components/articlepage/RelatedArticleBox";
import { RelatedArticle } from "@/types";
import { getRelatedArticleOpts } from "@/queries.ts";

type RelatedArticlesProps = {
  articleId: string;
};

export default function RelatedArticleSlider({
  articleId,
}: RelatedArticlesProps) {
  const { data: articles } = useSuspenseQuery(getRelatedArticleOpts(articleId));
  const [selected, setSelected] = useState(0);

  const article = articles[selected];

  const handleClick = (amount: number) => {
    const newSelected = selected + amount;
    setSelected(
      newSelected < 0
        ? articles.length - 1
        : newSelected > articles.length - 1
          ? 0
          : newSelected,
    );
  };

  return (
    <RelatedArticleBox
      onNextClick={() => handleClick(+1)}
      onPrevClick={() => handleClick(-1)}
      article={article}
    />
  );
}
