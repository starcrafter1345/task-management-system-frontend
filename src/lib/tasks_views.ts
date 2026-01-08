import { apiClient } from "@/lib/apiClient.ts";
import { queryOptions } from "@tanstack/react-query";
import type { TasksGroupedByCourse, TasksGroupedByDate } from "@/types/Task.ts";

async function getTasksGroupedByCourses() {
  const r = await apiClient.get<TasksGroupedByCourse[]>("/task");

  return r.data;
}

export const getTasksGroupedByCoursesQueryOptions = queryOptions({
  queryKey: ["tasks_overview"],
  queryFn: getTasksGroupedByCourses,
});

async function getTasksGroupedByDates(course_id: number) {
  const r = await apiClient.get<TasksGroupedByDate>(`/course/${course_id}`);

  return r.data;
}

export const getTasksGroupedByDatesQueryOptions = (course_id: number) =>
  queryOptions({
    queryKey: ["course_tasks"],
    queryFn: () => getTasksGroupedByDates(course_id),
  });
