import { Outlet, createFileRoute } from "@tanstack/react-router";

import ArticlesRouteHeader from "@/components/layout/ArticlesRouteHeader";
import Footer from "@/components/layout/Footer";

export const Route = createFileRoute("/articles")({
  component: ArticlesRouteLayout,
});

function ArticlesRouteLayout() {
  return (
    <main
      className={
        "ArticlesLayout flex flex-grow flex-col justify-between space-y-4"
      }
    >
      <ArticlesRouteHeader />
      <div className={"flex flex-grow flex-col justify-center"}>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
