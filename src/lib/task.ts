import type { NewTask, Task, UpdateTask } from "@/types/Task.ts";
import { apiClient } from "@/lib/apiClient.ts";

export async function addTask(data: NewTask) {
  const r = await apiClient.post<Task>("/task", data);

  return r.data;
}

export async function taskCompletionToggle({ data, task_id }: { data: boolean; task_id: number }) {
  const r = await apiClient.patch<Task>(`/task/${task_id}`, { completed: data });

  return r.data;
}

export async function updateTask({ data }: { data: UpdateTask }) {
  const r = await apiClient.patch<Task>(`/task/${data.id}`, data);

  return r.data;
}

export async function deleteTask({ task_id }: { task_id: number }) {
  const r = await apiClient.delete<void>(`/task/${task_id}`);

  return r.data;
}
