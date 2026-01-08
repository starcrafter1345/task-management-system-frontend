import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type Dispatch, type SetStateAction, useState } from "react";
import { formatISO } from "date-fns";
import { StatusBadge } from "@/components/common/StatusBadge.tsx";
import { Form } from "@/components/ui/form.tsx";
import { useForm } from "react-hook-form";
import type { UpdateTask } from "@/types/Task.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskCompletionToggle, updateTask } from "@/lib/task.ts";

import { DatePicker } from "@/components/features/tasks/components/DatePicker.tsx";
import { CompletedToggle } from "@/components/features/tasks/components/CompletedToggle.tsx";
import { TaskNameInput } from "@/components/features/tasks/components/TaskNameInput.tsx";
import { DescriptionTextArea } from "@/components/features/tasks/components/DescriptionTextArea.tsx";
import { DeleteTaskButton } from "@/components/features/tasks/DeleteTaskButton.tsx";
import { toast } from "sonner";

export function TaskCard({
  task_id,
  name,
  due_time,
  description,
  completed,
  course_id,
}: {
  task_id: number;
  name: string;
  due_time: string;
  description: string | undefined;
  completed: boolean;
  course_id: number;
}) {
  const [redact, setRedact] = useState<boolean>(false);

  return (
    <Dialog>
      <Card className="relative flex-shrink-0 w-72 min-w-72 transform truncate transition-transform duration-200 will-change-transform hover:-translate-y-1 hover:shadow-lg">
        <StatusBadge completed={completed} due_time={due_time} />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl">{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          {formatISO(due_time, { representation: "date" })}
          <DialogTrigger asChild className="text-left">
            <Button size="sm" variant="outline">
              Open
            </Button>
          </DialogTrigger>
        </CardContent>
      </Card>

      <DialogContent>
        {redact ? (
          <RedactDialog
            task_id={task_id}
            name={name}
            description={description}
            completed={completed}
            due_time={due_time}
            course_id={course_id}
            setRedact={setRedact}
          />
        ) : (
          <DefaultDialog
            task_id={task_id}
            name={name}
            description={description}
            completed={completed}
            setRedact={setRedact}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function RedactDialog({
  task_id,
  name,
  due_time,
  description,
  completed,
  course_id,
  setRedact,
}: {
  task_id: number;
  name: string;
  due_time: string;
  description: string | undefined;
  completed: boolean;
  course_id: number;
  setRedact: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const form = useForm<UpdateTask>({
    defaultValues: {
      id: task_id,
      completed: completed ?? false,
      name: name ?? "",
      description: description ?? "",
      course_id: course_id,
      due_time: due_time ?? new Date().toISOString(),
    },
  });

  const mutation = useMutation({
    mutationKey: ["task", task_id],
    mutationFn: updateTask,
    onSuccess: async () => {
      toast.success("Task updated");
      form.reset();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["tasks_overview"] }),
        queryClient.invalidateQueries({ queryKey: ["stats"] }),
      ]);
    },
  });

  function handleSubmit(data: UpdateTask) {
    mutation.mutate({ data });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader className="mb-4 flex flex-row">
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row gap-4">
          <TaskNameInput control={form.control} />

          <CompletedToggle control={form.control} />
        </div>

        <DescriptionTextArea control={form.control} />

        <DatePicker control={form.control} />

        <DialogFooter className={"flex-row justify-between sm:justify-between"}>
          <DialogClose asChild>
            <Button
              type={"button"}
              onClick={() => {
                setRedact(false);
              }}>
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

function DefaultDialog({
  task_id,
  name,
  description,
  completed,
  setRedact,
}: {
  task_id: number;
  name: string;
  description: string | undefined;
  completed: boolean;
  setRedact: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const [checkbox, setCheckbox] = useState<boolean>(completed);

  const mutation = useMutation({
    mutationKey: ["task", task_id],
    mutationFn: taskCompletionToggle,
    onSuccess: async () => {
      toast.success("Task status updated");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["tasks_overview"] }),
        queryClient.invalidateQueries({ queryKey: ["stats"] }),
      ]);
    },
  });

  function handleFormOnChange(data: boolean, task_id: number) {
    mutation.mutate({ data, task_id });
    setRedact(false);
  }

  return (
    <>
      <DialogHeader className="flex flex-row">
        <DialogTitle>{name}</DialogTitle>
        <form onChange={() => handleFormOnChange(checkbox, task_id)}>
          <Checkbox checked={checkbox} onCheckedChange={() => setCheckbox(!checkbox)} />
        </form>
      </DialogHeader>
      <DialogDescription>{description}</DialogDescription>
      <DialogFooter className={"flex-row justify-between sm:justify-between"}>
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            type={"button"}
            onClick={(e) => {
              e.preventDefault();
              setRedact(true);
            }}>
            Edit
          </Button>
          <DeleteTaskButton taskId={task_id} />
        </div>
        <DialogClose asChild>
          <Button type={"button"}>Close</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
