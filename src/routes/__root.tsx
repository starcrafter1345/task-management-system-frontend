import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

import "../index.css";
import type { QueryClient } from "@tanstack/react-query";
import type { AuthContext } from "@/auth.tsx";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : React.lazy(() =>
      import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      }))
    );

interface RouterContext {
  queryClient: QueryClient;
  auth: AuthContext;
}

const RootLayout = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Outlet />
    <Toaster />
    <React.Suspense>
      <TanStackRouterDevtools />
    </React.Suspense>
  </ThemeProvider>
);

export const Route = createRootRouteWithContext<RouterContext>()({ component: RootLayout });
