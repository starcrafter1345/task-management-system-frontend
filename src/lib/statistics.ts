import { apiClient } from "@/lib/apiClient.ts";
import type { Statistics } from "@/types/Statistics.ts";
import { queryOptions } from "@tanstack/react-query";

async function getStatistics() {
  const r = await apiClient.get<Statistics>("/task/stats");
  return r.data;
}

export const statisticsQueryOptions = queryOptions({
  queryKey: ["stats", "tasks_overview"],
  queryFn: getStatistics,
});
