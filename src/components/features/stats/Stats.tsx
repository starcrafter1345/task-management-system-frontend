import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleAlert, CircleCheckBig, CircleDashed, Hash } from "lucide-react";
import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { statisticsQueryOptions } from "@/lib/statistics.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export function Stats() {
  const { data: stats, isFetching } = useQuery(statisticsQueryOptions);

  if (isFetching) {
    return (
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Skeleton className="h-32 w-full bg-gray-300" />
        <Skeleton className="h-32 w-full bg-gray-300" />
        <Skeleton className="h-32 w-full bg-gray-300" />
        <Skeleton className="h-32 w-full bg-gray-300" />
      </div>
    );
  }

  if (!stats) {
    return <div>No Stats</div>;
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <StatsCard
        title="Total"
        quantity={stats.total}
        icon={<Hash className="text-muted-foreground size-5" />}
      />

      <StatsCard
        title="Completed"
        quantity={stats.completed}
        icon={<CircleCheckBig className="size-5 text-green-700" />}
      />

      <StatsCard
        title="In progress"
        quantity={stats.inProgress}
        icon={<CircleDashed className="size-5 text-yellow-500" />}
      />

      <StatsCard
        title="Overdue"
        quantity={stats.overdue}
        icon={<CircleAlert className="size-5 text-red-600" />}
      />
    </div>
  );
}

function StatsCard({
  title,
  icon,
  quantity,
}: {
  title: string;
  icon: JSX.Element;
  quantity: number;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <h3 className="text-2xl font-bold">{quantity}</h3>
      </CardContent>
    </Card>
  );
}
