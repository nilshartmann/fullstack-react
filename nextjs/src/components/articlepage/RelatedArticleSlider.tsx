"use client";

import { ReactNode, use, useState } from "react";

import { ArrowButton } from "@/components/Button";

type RelatedArticlesProps = {
  relatedArticlePromise: Promise<ReactNode[]>;
};

export default function RelatedArticleSlider({
  relatedArticlePromise,
}: RelatedArticlesProps) {
  const articles = use(relatedArticlePromise);
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
    <div className={"transform"}>
      <button
        className={"absolute left-2 top-2 z-10"}
        onClick={() => handleClick(-1)}
      >
        <ArrowButton direction={"left"} />
      </button>
      {article}
      <button
        onClick={() => handleClick(+1)}
        className={"absolute right-2 top-2"}
      >
        <ArrowButton direction={"right"} />
      </button>
    </div>
  );
}
