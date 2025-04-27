import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";

import "../globals.css";
import type { QueryClient } from "@tanstack/react-query";
import GlobalHeader from "@/components/layout/GlobalHeader.tsx";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  loader: ({ location }) => {
    if (location.pathname === "/") {
      throw redirect({ to: "/articles" });
    }
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "ecolify TanStack Demo",
      },
    ],
    links: [
      { href: "/fonts/google-fonts.css", rel: "stylesheet" },
      { href: "/fontawesome/css/fontawesome.css", rel: "stylesheet" },
      { href: "/fontawesome/css/brands.css", rel: "stylesheet" },
      { href: "/fontawesome/css/regular.css", rel: "stylesheet" },
      { href: "/fontawesome/css/solid.css", rel: "stylesheet" },
    ],
  }),

  component: () => (
    <>
      <HeadContent />
      <>
        <GlobalHeader />
        <Outlet />
      </>
    </>
  ),
});

function SsrRootDocument({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        <HeadContent />
      </head>
      <body
        className="flex min-h-svh flex-col overflow-y-scroll font-inter text-teal-900 antialiased"
        suppressHydrationWarning
      >
        {children}
        <Scripts />
      </body>
    </>
  );
}
