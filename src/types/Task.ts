import { z } from "zod";

export interface Task {
  id: number;
  course_id: number;

  name: string;
  description: string | undefined;
  completed: boolean;

  due_time: string;
  created_at: string;
  updated_at: string;
}

const NewTaskSchema = z.object({
  name: z.string().min(2),
  description: z.string(),
  completed: z.boolean(),
  due_time: z.iso.date(),
  course_id: z.int(),
});

const UpdateTaskSchema = z.object({
  id: z.int(),
  name: z.string().min(2),
  description: z.string(),
  completed: z.boolean(),
  due_time: z.iso.date(),
  course_id: z.int,
});

export type NewTask = z.infer<typeof NewTaskSchema>;

export type UpdateTask = z.infer<typeof UpdateTaskSchema>;

export interface TasksGroupedByCourse {
  id: number;
  title: string;
  tasks: Task[];
}

export interface TasksGroupedByDate {
  id: number;
  title: string;
  tasks: Record<string, Task[]>;
}
