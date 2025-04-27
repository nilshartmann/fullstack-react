import { ReactNode } from "react";

import ArticlesRouteHeader from "@/components/layout/ArticlesRouteHeader";
import Footer from "@/components/layout/Footer";

// SHORTCUT: aroute

type ArticlesRouteLayoutProps = {
  children: ReactNode;
};

export default function ArticlesRouteLayout({
  children,
}: ArticlesRouteLayoutProps) {
  return (
    <main
      className={
        "ArticlesLayout flex flex-grow flex-col justify-between space-y-4"
      }
    >
      <ArticlesRouteHeader />
      <div className={"flex flex-grow flex-col justify-center"}>{children}</div>
      <Footer />
    </main>
  );
}
