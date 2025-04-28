import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";
// import "../globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import globalsCss from "../globals.css?url";
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
      { href: globalsCss, rel: "stylesheet" },
      { href: "/fonts/google-fonts.css", rel: "stylesheet" },
      { href: "/fontawesome/css/fontawesome.css", rel: "stylesheet" },
      { href: "/fontawesome/css/brands.css", rel: "stylesheet" },
      { href: "/fontawesome/css/regular.css", rel: "stylesheet" },
      { href: "/fontawesome/css/solid.css", rel: "stylesheet" },
    ],
  }),

  component: RootComponent,
});

function RootComponent() {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <GlobalHeader />
        <Outlet />
        <ReactQueryDevtools />
        <Scripts />
      </body>
    </html>
  );
}
