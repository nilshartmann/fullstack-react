import Link from "next/link";

import { H3 } from "@/components/Heading";
import { RelatedArticle } from "@/types";

type RelatedArticleBoxProps = {
  article: RelatedArticle;
};

/**
 * Renders a related Article
 *
 */
export default function RelatedArticleBox({ article }: RelatedArticleBoxProps) {
  return (
    <div
      className={"border-teal rounded-lg"}
      style={{
        "--article-bg-image": `url('${article.image?.uri}')`,
      }}
    >
      <div className={"transform"}>
        <div className={"overflow-hidden"}>
          <img
            className="h-48 max-h-full w-full max-w-full transform rounded object-cover"
            src={article.image?.uri}
            alt={article.image?.altText}
          />

          <div className={"absolute bottom-2 w-full"}>
            <div
              className={
                "mx-2 flex justify-center rounded-lg bg-white/90 p-2 text-center"
              }
            >
              <Link
                href={`/articles/${article.id}`}
                prefetch={false}
                className={"hover:underline"}
              >
                <H3 className={"text-teal-700"}>{article.title}</H3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
