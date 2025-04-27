import { ReactNode } from "react";

import { ArticleBanner } from "@/components/articlepage/ArticleBanner";
import ArticleBody from "@/components/articlepage/ArticleBody";
import TwoColumnLayout from "@/components/layout/TwoColumnLayout";
import { Sidebar } from "@/components/Sidebar.tsx";
import { SidebarBox } from "@/components/SidebarBox.tsx";
import { Article } from "@/types";

type ArticlePageProps = {
  article: Article;
  sidebarTitle?: string;
  sidebar?: ReactNode;
};

export default function ArticlePageLayout({
  article,
  sidebarTitle = "Related Articles",
  sidebar,
}: ArticlePageProps) {
  return (
    <>
      <ArticleBanner article={article} />
      <TwoColumnLayout
        sidebar={
          !!sidebar && (
            <Sidebar>
              <SidebarBox title={sidebarTitle}>{sidebar}</SidebarBox>
            </Sidebar>
          )
        }
      >
        <ArticleBody body={article.body} />
      </TwoColumnLayout>
    </>
  );
}
