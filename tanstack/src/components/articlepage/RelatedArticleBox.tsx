import { Link } from "@tanstack/react-router";

import { ArrowButton } from "@/components/Button";
import { H3 } from "@/components/Heading";
import { enableRelatedArticlesButton } from "@/demo-config";
import { RelatedArticle } from "@/types";

type RelatedArticleBoxProps = {
  onNextClick(): void;
  onPrevClick(): void;
  article: RelatedArticle;
};

/**
 * Shows the image and title of an image and provides back and forward buttons.
 *
 */
export default function RelatedArticleBox({
  article,
  onNextClick,
  onPrevClick,
}: RelatedArticleBoxProps) {
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

          {enableRelatedArticlesButton && (
            <button
              className={"absolute left-2 top-2"}
              onClick={() => onPrevClick()}
            >
              <ArrowButton direction={"left"} />
            </button>
          )}
          <div className={"absolute bottom-2 w-full"}>
            <div
              className={
                "mx-2 flex justify-center rounded-lg bg-white/90 p-2 text-center"
              }
            >
              {/*todo:
                <Link to={`/articles/$articleId`}
                  params={{ articleId: article.id }}
                  className={"hover:underline"}>
                    <H3 className={"text-teal-700"}>{article.title}</H3>
                </Link>
            */}
              <H3 className={"text-teal-700"}>{article.title}</H3>
            </div>
          </div>
          {enableRelatedArticlesButton && (
            <button
              onClick={() => onNextClick()}
              className={"absolute right-2 top-2"}
            >
              <ArrowButton direction={"right"} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
