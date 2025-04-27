import { ReactNode, Suspense } from "react";

import { ArticleBanner } from "@/components/articlepage/ArticleBanner";
import ArticleBody from "@/components/articlepage/ArticleBody";
import TwoColumnLayout from "@/components/layout/TwoColumnLayout";
import { Article } from "@/types";
import { SidebarBox } from "@/components/SidebarBox.tsx";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";
import RelatedArticleSlider from "@/components/articlepage/RelatedArticleSlider.tsx";
import { Sidebar } from "@/components/Sidebar.tsx";

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
