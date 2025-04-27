import Link from "next/link";

import { Button } from "@/components/Button";
import { Article } from "@/types";

type ArticleNavBarProps = {
  article: Article;
};
export default function ArticleNavBar({ article }: ArticleNavBarProps) {
  return (
    <div className={"container mx-auto flex items-center justify-between"}>
      <NavButton direction={"next"} article={article} />
      <NavButton direction={"prev"} article={article} />
    </div>
  );
}

type NavButtonProps = {
  direction: "prev" | "next";
  article: Article;
};
function NavButton({ article, direction }: NavButtonProps) {
  const targetArticle =
    direction === "prev" ? article.prevArticle : article.nextArticle;
  const icon = (
    <i
      className={`fa-solid ${direction === "prev" ? "fa-arrow-right" : "fa-arrow-left"} px-6`}
    ></i>
  );

  if (!targetArticle) {
    return <Button disabled={true}>{icon}</Button>;
  }

  return (
    <Link href={`/articles/${targetArticle.id}`}>
      <Button>{icon}</Button>
    </Link>
  );
}
