import { createFileRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "@/components/layout/Sidebar.tsx";
import { Header } from "@/components/layout/Header.tsx";

export const Route = createFileRoute("/_auth/dashboard")({
  component: DashboardLayoutComponent,
});

function DashboardLayoutComponent() {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-muted/40">
      <div className="hidden md:block md:w-64 md:border-r">
        <Sidebar className="border-none" />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
