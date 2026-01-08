import { createFileRoute } from "@tanstack/react-router";
import { Stats } from "@/components/features/stats/Stats.tsx";
import { TaskListOverview } from "@/components/features/tasks/TaskListOverview.tsx";

export const Route = createFileRoute("/_auth/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="m-4 mt-4">
      <Stats />
      <TaskListOverview />
    </div>
  );
}
