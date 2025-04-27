import { Link } from "@tanstack/react-router";

import { PageButton } from "@/components/Button";
import PaginationBar from "@/components/PaginationBar";

type ArticleListPaginationBarProps = {
  pageable: {
    totalPages: number;
  };
  params: Promise<Record<string, string>>;
};

export default async function ArticleListPaginationBar({
  pageable,
  params,
}: ArticleListPaginationBarProps) {
  const searchParams = await params;
  const totalPages = pageable.totalPages; // pageCountPromise.then((t) => t.totalPages);
  const currentPage = parseInt(searchParams.page || "1");

  return (
    <div className={"flex justify-center pt-4"}>
      <PaginationBar totalPages={totalPages} currentPage={currentPage}>
        {(btn) =>
          btn.disabled ? (
            <PageButton state={btn} />
          ) : (
            <Link to={"/articles"}>
              <PageButton state={btn} />
            </Link>
          )
        }
      </PaginationBar>
    </div>
  );
}
