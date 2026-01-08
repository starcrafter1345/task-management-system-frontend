import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated && !context.auth.loading) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/login" });
    }
  },
});

function AuthLayout() {
  return <Outlet />;
}
