import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter, createHashHistory } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/auth.tsx";

const queryClient = new QueryClient();

const hashHistory = createHashHistory();

// Create a new router instance
const router = createRouter({
  routeTree,
  history: hashHistory,
  context: {
    queryClient,
    auth: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppWithAuth() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}

const handleAuthFail = () => {
  setTimeout(() => {
    void router.navigate({ to: "/login" });
  }, 0);
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider onAuthFail={handleAuthFail}>
        <AppWithAuth />
        {/*<RouterProvider router={router} context={{ auth: useAuth() }} />*/}
      </AuthProvider>
    </QueryClientProvider>
  );
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
