import type { Course, Courses, newCourse } from "@/types/Courses";
import { apiClient } from "@/lib/apiClient.ts";
import { queryOptions } from "@tanstack/react-query";

async function getCourses() {
  const r = await apiClient.get<Courses[]>("/course");

  return r.data;
}

export async function addCourse(newCourse: newCourse) {
  const r = await apiClient.post<Course>("/course", newCourse);
  return r.data;
}

export async function updateCourse({ id, data }: { id: number; data: newCourse }) {
  const r = await apiClient.patch<Course>(`/course/${id}`, data);
  return r.data;
}

export async function deleteCourse(id: number) {
  const r = await apiClient.delete(`/course/${id}`);
  return r.data;
}

export const coursesQueryOptions = queryOptions({
  queryKey: ["courses"],
  queryFn: getCourses,
});
