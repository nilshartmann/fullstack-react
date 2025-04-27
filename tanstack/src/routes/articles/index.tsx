import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getArticleListOpts } from "@/queries.ts";
import ArticleListGrid from "@/components/articlelistpage/ArticleListGrid.tsx";

export const Route = createFileRoute("/articles/")({
  component: ArticleList,
  loader({ context }) {
    // ganze Seite soll mit SSR gerendert werden:
    //   - wir müssen im Loader ein Promise zurückliefern
    //   - das geht mit oder ohne TS Query, aber weil man in einer
    //     realistischen App m.E. _immer_ TS Query verwenden würde,
    //     machen wir das hier auch
    //
    // - Die Daten landen im TS Query Cache
    //    - Je nach Konfiguration brauchen sie dann im _Client_
    //      nicht mehr gelesen werden
    //    - Aber _wenn_ sie im Client gelesen werden,
    //      wird das Backend direkt abgefragt
    //      -> deswegen Server function
    //
    // todo: hier nochmal nachlesen, fetchQuery vs. ensureQueryData:
    //    - https://tkdodo.eu/blog/react-query-meets-react-router#getquerydata--fetchquery
    //    -
    // - Problem; wenn die DAten hier geladen werden, dann ist die Komponente
    //    kein "Subscriber", d.h. wenn die Daten über den CACHE geändert werden,
    //    findet kein Re-Rendering statt...
    //     -> In den Beispielen machen Sie Preload + useSuspenseQuery
    //     https://tanstack.com/router/latest/docs/framework/react/examples/basic-react-query-file-based?path=examples%2Freact%2Fbasic-react-query-file-based%2Fsrc%2Froutes%2Fposts.route.tsx

    return context.queryClient.ensureQueryData(getArticleListOpts());
  },
});

function ArticleList() {
  const { data: articles } = useSuspenseQuery(getArticleListOpts());

  return <ArticleListGrid articles={articles.articles} />;
}
